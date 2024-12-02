import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt'
import { UserSerializer } from './serializer(dto)/user.serializer';
import { plainToClass } from 'class-transformer';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * 사용자 생성
   * @param Username 유저 아이디
   * @param Password 비밀번호
   * @param Phone_Number 전화번호
   * @param Email 이메일
   * @returns 생성된 사용자
   */
  async createUser(
    Username: string, 
    Password: string,
    Phone_Number:string, 
    Email:string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser =this.userRepository.create({
      Username:Username,
      Password:hashedPassword,
      Phone_Number:Phone_Number,
      Email:Email,
      Is_Superuser:false,
    })
    return await this.userRepository.save(newUser);
    // const user = new User();
    // user.Username = username;
    // user.Password = password;
    // await this.userRepository.save(user);
    // return user;
  }

   /**
   * 사용자 아이디로 사용자 찾기
   * @param Username 유저 아이디
   * @returns 유저 정보 또는 undefined
   */
  async findUserByUsername(Username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { Username: Username } });
  }

  /**
   * 사용자 검증
   * @param Username 유저 아이디
   * @param Password 비밀번호
   * @returns 유저 정보 또는 null
   */
  async validateUser(Username: string, Password: string): Promise<UserSerializer | null>{
    const user = await this.findUserByUsername(Username);

    if(user){
      const isPasswordMatching = await bcrypt.compare(Password,user.Password);
      if(isPasswordMatching){
        // const {Password,...result} = user;
        // return result
        return user? plainToClass(UserSerializer,user,{excludeExtraneousValues:true}):null;
      }
    }
    return null;
  }
  /**
   * 비밀번호 업데이트
   * @param Email 이메일
   * @param Phone_Number 전화번호
   * @param newPassword 새로운 비밀번호
   * @returns 업데이트된 사용자
   */
  async updatePassword(newPassword: string, Email: string = '', Phone_Number: string = ''): Promise<User | null>{
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const criteria: Partial<User> = {};
    if (Email) {
      criteria.Email = Email;
    }
    if (Phone_Number) {
      criteria.Phone_Number = Phone_Number;
    }
    
    await this.userRepository.update(criteria, { Password: hashedPassword });
    return this.userRepository.findOne({ where: criteria });
  }
  /**
   * 사용자 정보 업데이트
   * @param Username 유저 아이디
   * @param updateData 수정할 데이터
   * @returns 수정된 사용자
   */
  async updateUser(Username: string, updateData: Partial<User>):Promise<User|null>{
    await this.userRepository.update({Username}, updateData);
    return this.userRepository.findOne({where:{Username}})
  }
  /**
   * 사용자 삭제
   * @param Username 유저 아이디
   * @returns 삭제 결과 메시지
   */
  async deleteUser(Username:string): Promise<{ message: string }>{
    await this.userRepository.delete({Username});
    return{message:'회원 탈퇴` 완료'}
  }
  /**
   * 이메일로 사용자 찾기
   * @param email 이메일
   * @returns 유저 정보 또는 null
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { Email: email } });
  }

  /**
   * 전화번호로 사용자 찾기
   * @param phoneNumber 전화번호
   * @returns 유저 정보 또는 null
   */
  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { Phone_Number: phoneNumber } });
  }
}
