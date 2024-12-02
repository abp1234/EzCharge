import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate, IsOptional } from 'class-validator';
import { Point } from 'typeorm';

export class CreateRobotLogDto {
    @ApiProperty({ description: '로봇 정보 ID', example: 1 })
    @IsNumber()
    Robot_Info_Id!: number;

    @ApiProperty({ description: '주차 구역 정보 ID', example: 1 })
    @IsNumber()
    Parking_Area_Info_Id!: number;

    @ApiProperty({ description: '로봇 상태', example: '운행 중', required: false })
    @IsString()
    @IsOptional()
    State: string='';

    @ApiProperty({ description: '로봇 좌표 (XY)', type: 'object', example: { type: 'Point', coordinates: [0, 0] }, required: false })
    @IsOptional()
    Robot_Coordinate_XY: Point = { type: 'Point', coordinates: [0, 0] };

    @ApiProperty({ description: '로봇 Z 좌표', example: 0, required: false })
    @IsOptional()
    Robot_Coordinate_Z: number = 0;

    @ApiProperty({ description: '로봇 전면 좌표 (XY)', type: 'object', example: { type: 'Point', coordinates: [0, 0] }, required: false })
    @IsOptional()
    Robot_Front_Coordinate_XY: Point = { type: 'Point', coordinates: [0, 0] };

    @ApiProperty({ description: '로봇 전면 ZW 좌표', type: 'object', example: { type: 'Point', coordinates: [0, 0] }, required: false })
    @IsOptional()
    Robot_Front_Coordinate_ZW: Point = { type: 'Point', coordinates: [0, 0] };

    @ApiProperty({ description: '시간', example: '2024-07-21T10:00:00Z' })
    @IsDate()
    Time!: Date;
}
