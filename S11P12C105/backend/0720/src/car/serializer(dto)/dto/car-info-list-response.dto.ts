import { ApiProperty } from '@nestjs/swagger';
import { CarInfoResponseDto } from './car-info-response.dto';

export class CarInfoListResponseDto {
  @ApiProperty({
    description: '차량 목록',
    type: [CarInfoResponseDto],
  })
  cars!: CarInfoResponseDto[];
}
