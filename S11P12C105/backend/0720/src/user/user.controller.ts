import { Controller, Post,Get, Body,Response, UseGuards, Put, Req, Delete, Res} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { Users } from '../common/decorators/user.decorator';
import { JwtAuthGuard } from '../guard/UserValidate.guard'; 
import { Twillo_Repository } from '../openapi/twillo.repository';
import { GmailEmailRepository } from '../openapi/gmail_email.repository';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserSerializer } from './serializer(dto)/user.serializer';
import { LoginDto } from './serializer(dto)/dto/login.dto';
import { CreateUserDto } from './serializer(dto)/dto/create-user.dto';
import { ResetPasswordDto } from './serializer(dto)/dto/reset-password.dto';
import { UpdateUserDto } from './serializer(dto)/dto/update-user.dto';
import { FindUsernameDto } from './serializer(dto)/dto/find-user-name.dto';
import { RequestVerificationCodeDto } from './serializer(dto)/dto/request-verification-code.dto';
import { NotificationService } from '../notification/notification.service';

import { Request, Response as ExpressResponse } from 'express';
@Controller('users') // 기본 경로
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly twilloRepository: Twillo_Repository,
    private readonly gmailEmailRepository: GmailEmailRepository,
    private readonly notificationService: NotificationService,
  ) {}


  
  @Post('register')
  @ApiOperation({ summary: '회원 가입' })
  @ApiBody({
    description: '회원 가입에 필요한 정보',
    type: CreateUserDto, 
  })
  @ApiResponse({
    status: 201,
    description: '회원 가입 완료',
    type: UserSerializer,
  })
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const { Username, Password, Phone_Number, Email, VerificationCode } = createUserDto;
    // 회원가입
    const newUser = await this.userService.createUser(Username, Password, Phone_Number, Email, VerificationCode);
    if (newUser.firebaseToken) {
    // 알림 전송
    await this.notificationService.sendNotification(
      newUser.firebaseToken, // 사용자의 Firebase Token
      '회원 가입 완료',
      `회원 ${newUser.Username}님의 회원 가입이 완료되었습니다. 축하합니다!`,
    );
    
  }
    return {
      isSuccess: 1,
      code: 201,
      message: '회원 가입 완료',
      result: { user: newUser }
    };
  }

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiBody({
    description: '로그인에 필요한 정보',
    type: LoginDto, 
  })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: UserSerializer,
  })
  @ApiResponse({
    status: 401,
    description: '로그인 실패',
  }) 
  async loginUser(@Body() loginDto: LoginDto) {
    const { Username, Password } = loginDto;
    const user = await this.userService.validateUser(Username, Password);
    // 사용자 인증 처리
    if (user) {
      return {
        isSuccess: 1,
        code: 200,
        message: '로그인 성공',
        result: { user }
      };
    } else {
      return {
        isSuccess: 0,
        code: 401,
        message: '유효하지 않는 로그인 시도',
        result: {}
      };
    }
  }

  // 로그아웃 API
  @Post('logout')
  @ApiOperation({ summary: '로그아웃' })
  @UseGuards(JwtAuthGuard)// 인증된 사용자만 접근 가능
  async logoutUser(@Response() res:ExpressResponse){
    res.clearCookie('connect.sid', {httpOnly:true});
    // 로그아웃, 쿠키 삭제
    return res.send({
      isSuccess: 1,
      code: 200,
      message: '로그아웃 완료',
      result: {}
    });
  }

  // 사용자 프로필 가져오기 API
  @Get()
  @ApiOperation({ summary: '사용자 프로필 가져오기' })
  @ApiResponse({
    status: 200,
    description: '사용자 프로필 정보',
    type: UserSerializer,
  })
  @UseGuards(JwtAuthGuard) // 인증된 사용자만 접근 가능
  async getProfile(@Users() user:User){
    return {
      isSuccess: 1,
      code: 200,
      message: '사용자 프로필 조회 성공',
      result: { user }
    }; // 사용자 정보 반환
  }

  // 아이디 찾기 API
  @Post('find_username')
  @ApiOperation({ summary: '아이디 찾기' })
  @ApiBody({
    description: '이메일 또는 전화번호로 사용자 아이디 찾기',
    type: FindUsernameDto, 
  })
  @ApiResponse({
    status: 200,
    description: '아이디 찾기 결과',
    type: UserSerializer,
  })
  async findUsername(@Body() findUsernameDto: FindUsernameDto){
    const {Email, Phone_Number} = findUsernameDto;
    const user= await this.userService.findUsernameByEmailOrPhone(Email, Phone_Number);
    
    return {
      isSuccess: 1,
      code: 200,
      message: '아이디 찾기 성공',
      result: { user }
    };
  }

  // 비밀번호 재설정 요청 API
  @Post('reset_password')
  @ApiOperation({ summary: '비밀번호 재설정 요청' })
  @ApiBody({
    description: '비밀번호 재설정에 필요한 정보',
    type: ResetPasswordDto, 
  })
  @ApiResponse({
    status: 200,
    description: '비밀번호 변경 성공',
    type: UserSerializer,
  })
  async resetPassword(@Body() body: { email: string, phoneNumber: string, newPassword: string, verificationCode: string }) {
    const { email, phoneNumber, newPassword, verificationCode } = body;

    // 전화번호 인증 코드 확인
    if (phoneNumber) {
      if (!(await this.twilloRepository.verifyCode(phoneNumber, verificationCode))) {
        return {
          isSuccess: 0,
          code: 400,
          message: '전화번호 인증 코드가 유효하지 않습니다.',
          result: {}
        };
      }
    }

    // 이메일 인증 코드 확인
    if (email) {
      if (!(await this.gmailEmailRepository.verifyCode(email, verificationCode))) {
        return {
          isSuccess: 0,
          code: 400,
          message: '이메일 인증 코드가 유효하지 않습니다.',
          result: {}
        };
      }
    }
    // 비밀번호 재설정 처리
    const updatedUser = await this.userService.resetPassword(email, phoneNumber, newPassword, verificationCode);
    return {
      isSuccess: 1,
      code: 200,
      message: '비밀번호가 성공적으로 변경되었습니다.',
      result: { user: updatedUser }
    };  
  }
  // 개인정보 수정 API
  @Put('update')
  @ApiOperation({ summary: '사용자 정보 수정' })
  @ApiBody({
    description: '수정할 사용자 정보',
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: 200,
    description: '사용자 정보 수정 완료',
    type: UserSerializer,
  })
  @UseGuards(JwtAuthGuard) // 인증된 사용자만 접근 가능
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Users() user: User){
    // 사용자 정보 업데이트 처리
    const updatedUser = await this.userService.updateUser(user.Username, updateUserDto);

    return {
      isSuccess: 1,
      code: 200,
      message: '사용자 정보 수정 완료',
      result: { user: updatedUser }
    };
  }

  // 회원 탈퇴 API
  @Delete('delete')
  @ApiOperation({ summary: '회원 탈퇴' })
  @ApiResponse({
    status: 200,
    description: '회원 탈퇴 완료',
  })
  @UseGuards(JwtAuthGuard)// 인증된 사용자만 접근 가능
  async deleteUser(@Req() req:Request, @Res() res:ExpressResponse){
    
    const user = req.user as User;
    // 사용자 객체가 존재하는지 확인
    if (!user || !user.Username) {
      return res.status(400).json({ message: '사용자 정보가 없습니다.' });
    }
    // 사용자 삭제 처리
    await this.userService.deleteUser(user.Username);

    return {
      isSuccess: 1,
      code: 200,
      message: '회원 탈퇴 완료',
      result: {}
    };
  }
  // 인증번호 요청 API
  @Post('request_verification_code')
  @ApiOperation({ summary: '인증번호 요청' })
  @ApiBody({
    description: '인증번호를 요청할 이메일 또는 전화번호',
    type: RequestVerificationCodeDto,
  })
  @ApiResponse({
    status: 200,
    description: '인증번호 발송 완료',
  })
  async requestVerificationCode(@Body() body: { email?: string; phoneNumber?: string }) {
    const { email, phoneNumber } = body;

    if (phoneNumber) {
      const verificationCode = await this.userService.sendVerificationCode(phoneNumber);
      return {
        isSuccess: 1,
        code: 200,
        message: '전화번호로 인증번호가 발송되었습니다.',
        result: { verificationCode }
      };
    }

    if (email) {
      const verificationCode = await this.gmailEmailRepository.sendVerificationEmail(email);
      return {
        isSuccess: 1,
        code: 200,
        message: '이메일로 인증번호가 발송되었습니다.',
        result: { verificationCode }
      };
    }

    return {
      isSuccess: 0,
      code: 400,
      message: '이메일 또는 전화번호가 필요합니다.',
      result: {}
    };
  }
}
