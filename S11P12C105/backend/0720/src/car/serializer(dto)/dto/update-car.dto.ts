import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCarDto {
  @ApiPropertyOptional({
    description: '차량 번호',
    example: '456DEF',
    type: String,
  })
  Car_number?: string;
}
