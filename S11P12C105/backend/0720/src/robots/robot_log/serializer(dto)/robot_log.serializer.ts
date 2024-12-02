import { Exclude, Expose, Type } from 'class-transformer';
import { Robot_InfoSerializer } from '../../robot_Info/serializer(dto)/robot.serializer'; 
import { Parking_Area_InfoSerializer } from '../../../parking_area/Parking_Area_Info/serializer(dto)/parking_area.serializer'; 
import { Point } from 'typeorm';

export class Robot_LogSerializer {
    @Expose()
    Robot_Log_Id!: number;

    @Expose()
    @Type(()=>Robot_InfoSerializer)
    Robot_Info_Id!: Robot_InfoSerializer;

    @Expose()
    @Type(()=>Parking_Area_InfoSerializer)
    Parking_Area_Info_Id!: Parking_Area_InfoSerializer;

    @Expose()
    State!: string;

    @Expose()
    Robot_Coordinate_XY!: Point;

    @Expose()
    Robot_Coordinate_Z!: number;

    @Expose()
    Robot_Front_Coordinate_XY!: Point;

    @Expose()
    Robot_Front_Coordinate_ZW!: Point;

    @Expose()
    Time!: Date;


}