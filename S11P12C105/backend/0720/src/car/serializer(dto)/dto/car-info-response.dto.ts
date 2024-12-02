import { ApiProperty } from '@nestjs/swagger';

export class CarInfoResponseDto {
  @ApiProperty({
    description: '차량 ID',
    example: 1,
    type: Number,
  })
  Car_Info_Id!: number;

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
