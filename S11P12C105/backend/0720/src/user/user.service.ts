
import { Inject, Injectable, forwardRef } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from '../entities/user.entity';
// import * as bcrypt from 'bcrypt';

import { plainToClass } from 'class-transformer';
import { UserSerializer } from './serializer(dto)/user.serializer';
import { Twillo_Repository } from '../openapi/twillo.repository';
import { User } from '../entities/user.entity';
import { GmailEmailRepository } from '../openapi/gmail_email.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => UserRepository))
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => Twillo_Repository))
    private readonly twilloRepository: Twillo_Repository,
    @Inject(forwardRef(() => GmailEmailRepository))
    private readonly gmailEmailRepository: GmailEmailRepository
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
  ) {}

  /** 
   * 회원가입
   * @param Username 유저 아이디
   * @param Password 비밀번호
   * @param Phone_Number 전화번호
   * @param Email 이메일
   * @param verificationCode 인증 코드
   * @returns 생성된 사용자 정보
   */ 
  async createUser(
    Username: string, 
    Password: string, 
    Phone_Number:string, 
    Email:string,
    verificationCode:string,
  ): Promise<UserSerializer> {
    // 인증 번호 검증
    // 전화번호 인증 금전적 문제로 당분간 주석 처리 
    // if (!(await this.twilloRepository.verifyCode(Phone_Number, verificationCode))) {
    //   throw new Error('전화번호 인증번호가 유효하지 않습니다.');
    // }

    if (!(await this.gmailEmailRepository.verifyCode(Email, verificationCode))) {
      throw new Error('이메일 인증번호가 유효하지 않습니다.');
    }
    // 새로운 사용자 생성
    const user =await this.userRepository.createUser(Username, Password,Phone_Number,Email);
    return plainToClass(UserSerializer,user,{excludeExtraneousValues:true});
    // 비밀번호 해싱
    // const hashedPassword = await bcrypt.hash(Password, 10);

    // const newUser = this.userRepository.create({
    //   Username,
    //   Password: hashedPassword,
    // });

    // return await this.userRepository.save(newUser);
  }
  /**
   * 인증 코드 발송 
   * @param Phone_Number 전화번호
   * @returns 인증 코드
  */
  async sendVerificationCode(Phone_Number:string):Promise<string>{
    return this.twilloRepository.sendVerificationCode(Phone_Number);
  }
  /**
   * 인증 코드 발송 
   * @param Email 이메일
   * @returns 인증 코드
  */
  async sendVerificationEmail(Email: string): Promise<string> {
    return this.gmailEmailRepository.sendVerificationEmail(Email);
  }
  /**
   * 사용자 검증
   * @param Username 유저 아이디
   * @param Password 비밀번호
   * @returns 유저 정보 또는 null
   */
  async validateUser(
    Username: string, 
    Password: string
  ): Promise<UserSerializer|null> {
    const user = this.userRepository.validateUser(Username, Password);
    
    return user ? plainToClass(UserSerializer, user, { excludeExtraneousValues: true }) : null;
    // const user = await this.userRepository.findOne({ where: { Username } });

    // console.log('User:', user);
    // console.log('Provided password:', Password);

    // if (user&&Password) {
    //   const isPasswordMatching = await bcrypt.compare(Password, user.Password);
    //   console.log('Password match:', isPasswordMatching);
    //   if (isPasswordMatching) {
    //     const { Password, ...result } = user;
    //     return result;
    //   }
    // }
    // return null;
  }

  /**
   * 사용자 아이디로 사용자 찾기
   * @param Username 유저 아이디
   * @returns 유저 정보 또는 undefined
   */
  async findUserByUsername(Username: string): Promise<UserSerializer | null> {
    const user= await this.userRepository.findUserByUsername(Username);
  
    return user ? plainToClass(UserSerializer, user, {excludeExtraneousValues:true}): null;
  }

  /**
   * 이메일 또는 전화번호로 유저 아이디 찾기
   * @param email 이메일
   * @param phoneNumber 전화번호
   * @returns 유저 정보 또는 null
   */
  async findUsernameByEmailOrPhone(email?: string, phoneNumber?: string){
    if (email) {
      return await this.userRepository.findByEmail(email);
    }
    if (phoneNumber) {
      return await this.userRepository.findByPhoneNumber(phoneNumber);
    }
    throw new Error('이메일 또는 전화번호가 없음');
  }
  // // 이메일로 유저 아이디 찾기
  // async findByEmail(email: string){
  //   return await this.userRepository.findOne({where:{email}});
  // }
  // //전화번호로 유저 아이디 찾기
  // async findByPhoneNumber(phoneNumber:string){
  //   return await this.userRepository.findOne({where:{phoneNumber}});
  // }
  /**
   * 비밀번호 재설정
   * @param email 이메일
   * @param phoneNumber 전화번호
   * @param newPassword 새로운 비밀번호
   * @param verificationCode 인증 코드
   * @returns 업데이트된 사용자 정보
   */
  async resetPassword(
    newPassword: string,
    verificationCode: string,
    email?: string, 
    phoneNumber?: string
  ): Promise<UserSerializer> {
    if (phoneNumber) {
      if (!(await this.twilloRepository.verifyCode(phoneNumber, verificationCode))) {
        throw new Error('전화번호 인증코드가 유효하지 않습니다.');
      }
    }

    if (email) {
      if (!(await this.gmailEmailRepository.verifyCode(email, verificationCode))) {
        throw new Error('이메일 인증코드가 유효하지 않습니다.');
      }
    }

    const updatedUser = await this.userRepository.updatePassword( newPassword, email,phoneNumber);
    return plainToClass(UserSerializer, updatedUser, { excludeExtraneousValues: true });
    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    
  }

  /**
   * 사용자 정보 수정
   * @param username 유저 아이디
   * @param updateData 수정할 데이터
   * @returns 수정된 사용자 정보
   */
  async updateUser(username: string, updateData: Partial<User>): Promise<UserSerializer> {
    const updatedUser = await this.userRepository.updateUser(username, updateData);
    return plainToClass(UserSerializer, updatedUser, { excludeExtraneousValues: true });
  }
  /**
   * 사용자 삭제
   * @param username 유저 아이디
   * @returns 삭제 결과 메시지
   */
  async deleteUser(username: string): Promise<{ message: string }> {
    await this.userRepository.deleteUser(username);
    return { message: '회원 탈퇴 완료' };
  }
}
