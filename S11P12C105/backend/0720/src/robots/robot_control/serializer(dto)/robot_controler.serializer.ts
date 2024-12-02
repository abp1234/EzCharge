import { Exclude, Expose, Type } from 'class-transformer';
import { Parking_Area_InfoSerializer } from '../../../parking_area/Parking_Area_Info/serializer(dto)/parking_area.serializer'; 
import { ApiProperty } from '@nestjs/swagger';

export class Robot_InfoSerializer {
    @Expose()
    @ApiProperty({ example: 1, description: '로봇 정보 ID' })
    Robot_Info_Id!: number;

    @Expose()
    @ApiProperty({ example: 1, description: '주차장 구역 정보 ID' })
    @Type(() => Parking_Area_InfoSerializer)
    Parking_Area_Info_Id!: Parking_Area_InfoSerializer;

    @Expose()
    @ApiProperty({ example: true, description: '로봇 상태' })
    State!: boolean;
}