import { Exclude, Expose, Type } from 'class-transformer';
import { Point } from 'typeorm';
import { Parking_Area_InfoSerializer } from '../../Parking_Area_Info/serializer(dto)/parking_area.serializer'; 
export class Parking_Coordinate_InfoSerializer {
    @Expose()
    Parking_Coordinate_Info_Id!: number;

    @Expose()
    @Type(()=>Parking_Area_InfoSerializer)
    Parking_Area_Info_Id!: Parking_Area_InfoSerializer;

    @Expose()
    Idx!: string;

    @Expose()
    Coordiante_XY!: Point;

    @Expose()
    Coordiante_Z!: number;
    
    @Expose()
    Front_Coordiante_XY!: Point;

    @Expose()
    Front_Coordiante_ZW!: Point;
}