import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Parking_Coordinate_Info } from "../../entities/parking_coordinate.entity";
import { Parking_Coordinate_Info_Service } from "./parking_coordinate.service";
import { Parking_Coordinate_Info_Controller } from "./parking_coordinate.controller";


@Module({
    imports:[
        TypeOrmModule.forFeature([Parking_Coordinate_Info])
    ],
    providers:[Parking_Coordinate_Info_Service],
    exports:[Parking_Coordinate_Info_Service],
    controllers:[Parking_Coordinate_Info_Controller],
})
export class Parking_Coordinate_Info_Module{}