import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Parking_Area_Info } from "../../entities/parking_area.entity";
import { Parking_Area_Info_Service } from "./parking_area.service";
import { Parking_Area_Info_Controller } from "./parking_area.controller";





@Module({
    imports:[
        TypeOrmModule.forFeature([Parking_Area_Info]),
    ],
    providers:[Parking_Area_Info_Service],
    exports:[Parking_Area_Info_Service],
    controllers:[Parking_Area_Info_Controller],
})
export class Parking_Area_Info_Module{}