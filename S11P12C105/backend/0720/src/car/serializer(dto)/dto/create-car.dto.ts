import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 1,
    type: Number,
  })
  User_Id!: number;

  @ApiProperty({
    description: '차량 번호',
    example: '123ABC',
    type: String,
  })
  Car_number!: string;
}
