import { Exclude, Expose, Type } from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger'
import { Car_InfoSerializer } from '../../car/serializer(dto)/car.serializer';
import { Working_ScheduleSerializer } from '../../working_schedule/serializer(dto)/working_schedule.serializer';
// import { Car_InfoSerializer } from 'src/car/car.serializer';
// import { Working_ScheduleSerializer } from 'src/working_schedule/working_schedule.serializer';
export class UserSerializer {
  @Expose()
  @ApiProperty({
    example:'1',
    description: '유저테이블 PK',
  })
  User_Id!: number;

  @Expose()
  @ApiProperty({
    example:'NKJ',
    description: '유저 아이디',
  })
  Username!: string;

  @Exclude()
  @ApiProperty({
    example:'1234',
    description:'비밀번호',
  })
  Password!: string;

  @Expose()
  @ApiProperty({
    example:'01099998888',
    description:'전화번호',
  })
  Phone_Number!: string;

  @Expose()
  @ApiProperty({
    example:'abc@example.com',
    description:'이메일',
  })
  Email!: string;

  @Expose()
  @ApiProperty({
    example:'store/img/~~~.jpg',
    description:'저장url'
  })
  Profile_Img!: string;

  @Expose()
  @ApiProperty({
    example:'0',
    description:'관리자, 일반 유저 구분',
  })
  Is_Superuser!: boolean;

  @Expose()
  @ApiProperty({
    example: 'firebase_token_1234',
    description: 'Firebase 토큰',
    required: false,
  })
  firebaseToken?: string;

  @Expose()
  @Type(() => Car_InfoSerializer)
  @ApiProperty({
    type: [Car_InfoSerializer],
    description: '사용자 자동차 목록',
  })
  cars!: Car_InfoSerializer[];

  @Expose()
  @Type(() => Working_ScheduleSerializer)
  @ApiProperty({
    type: [Working_ScheduleSerializer],
    description: '사용자 작업 일정 목록',
  })
  workingSchedules!: Working_ScheduleSerializer[];
}
