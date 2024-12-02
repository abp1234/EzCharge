import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'newemail@example.com',
    description: '새로운 이메일',
    required: false
  })
  @IsOptional()
  @IsString()
  readonly Email?: string;

  @ApiProperty({
    example: '01088887777',
    description: '새로운 전화번호',
    required: false
  })
  @IsOptional()
  @IsString()
  readonly Phone_Number?: string;

  @ApiProperty({
    example: 'newpassword123',
    description: '새 비밀번호',
    required: false
  })
  @IsOptional()
  @IsString()
  readonly Password?: string;
}
