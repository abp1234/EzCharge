import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
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
}
