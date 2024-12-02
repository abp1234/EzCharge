import { Exclude, Expose, Type } from 'class-transformer';
import { Point } from 'typeorm';

export class Parking_Area_InfoSerializer {
    @Expose()
    Parking_Area_Info_Id!: number;

    @Expose()
    name!: string;

    @Expose()
    GPS_location!: Point;

    @Expose()
    Structure!: string;
}