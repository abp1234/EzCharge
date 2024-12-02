import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'NKJ',
    description: '유저 아이디',
  })
  @IsString()
  @IsNotEmpty()
  readonly Username!: string;

  @ApiProperty({
    example: '1234',
    description: '비밀번호',
  })
  @IsString()
  @IsNotEmpty()
  readonly Password!: string;

  @ApiProperty({
    example: '01099998888',
    description: '전화번호',
  })
  @IsString()
  @IsNotEmpty()
  readonly Phone_Number!: string;

  @ApiProperty({
    example: 'abc@example.com',
    description: '이메일',
  })
  @IsString()
  @IsNotEmpty()
  readonly Email!: string;

  @ApiProperty({
    example: '123456',
    description: '인증 코드',
  })
  @IsString()
  @IsNotEmpty()
  readonly VerificationCode!: string;
}
