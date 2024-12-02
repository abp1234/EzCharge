import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindUsernameDto {
  @ApiProperty({
    example: 'abc@example.com',
    description: '이메일',
    required: false
  })
  @IsOptional()
  @IsString()
  readonly Email?: string;

  @ApiProperty({
    example: '01099998888',
    description: '전화번호',
    required: false
  })
  @IsOptional()
  @IsString()
  readonly Phone_Number?: string;
}
