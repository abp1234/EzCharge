import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Point } from 'typeorm';

export class CreateParkingAreaInfoDto {
    @ApiProperty({ description: '주차장 ID', example: 1 })
    @IsNumber()
    Parking_Area_Info_Id!: number;

    @ApiProperty({ description: '주차장 이름', example: 'Downtown Parking' })
    @IsString()
    name!: string;

    @ApiProperty({ description: '주차장 GPS 위치', type: 'object', example: { type: 'Point', coordinates: [0, 0] } })
    @IsOptional()
    GPS_location?: Point;

    @ApiProperty({ description: '주차장 구조', example: 'Multistorey', required: false })
    @IsOptional()
    @IsString()
    Structure?: string;
}
