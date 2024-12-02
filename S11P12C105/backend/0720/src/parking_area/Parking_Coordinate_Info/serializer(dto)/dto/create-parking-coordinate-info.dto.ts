import { ApiProperty } from '@nestjs/swagger';
import { Point } from 'typeorm';

export class CreateParkingCoordinateInfoDto {
    @ApiProperty({ description: '주차장 정보 ID' })
    Parking_Area_Info_Id!: number;

    @ApiProperty({ description: '위치 인덱스', example: 'A1' })
    Idx!: string;

    @ApiProperty({ description: '좌표 X와 Y', type: 'object', example: { type: 'Point', coordinates: [1.0, 2.0] } })
    Coordinate_XY!: Point;

    @ApiProperty({ description: '좌표 Z', example: 3.0 })
    Coordinate_Z!: number;

    @ApiProperty({ description: '앞쪽 좌표 X와 Y', type: 'object', example: { type: 'Point', coordinates: [4.0, 5.0] } })
    Front_Coordinate_XY!: Point;

    @ApiProperty({ description: '앞쪽 좌표 ZW', type: 'object', example: { type: 'Point', coordinates: [6.0, 7.0] } })
    Front_Coordinate_ZW!: Point;
}
