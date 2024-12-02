import { Exclude, Expose, Type } from 'class-transformer';
import { Car_InfoSerializer } from '../../car/serializer(dto)/car.serializer'; 
import { Parking_Area_InfoSerializer } from '../../parking_area/Parking_Area_Info/serializer(dto)/parking_area.serializer'; 
import { Parking_Coordinate_InfoSerializer } from '../../parking_area/Parking_Coordinate_Info/serializer(dto)/parking_coordinate.serializer'; 
import { UserSerializer } from '../../user/serializer(dto)/user.serializer';

export class Working_ScheduleSerializer {
    @Expose()
    Working_Schedule_Id: number | undefined;

    @Expose()
    @Type(()=> UserSerializer)
    User_Id: UserSerializer | undefined;

    @Expose()
    @Type(()=>Car_InfoSerializer)
    Car_Id: Car_InfoSerializer | undefined;

    @Expose()
    @Type(() => Parking_Coordinate_InfoSerializer)
    Parking_Codinate_Info_Id!: Parking_Coordinate_InfoSerializer;

    @Expose()
    @Type(() => Parking_Area_InfoSerializer)
    Parking_Area_Info_Id!: Parking_Area_InfoSerializer;

    @Expose()
    Charge_Time!: number;

    @Expose()
    Is_Finished!: number;

    @Expose()
    Time!: Date;

}