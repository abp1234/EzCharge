import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'abc@example.com',
    description: '이메일',
  })
  readonly email: string='';

  @ApiProperty({
    example: '01099998888',
    description: '전화번호',
  })
  readonly phoneNumber: string='';

  @ApiProperty({
    example: 'newpassword123',
    description: '새 비밀번호',
  })
  readonly newPassword: string='';

  @ApiProperty({
    example: '123456',
    description: '인증 코드',
  })
  readonly verificationCode: string='';
}
