import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Robot_Info } from "../../entities/robot.entity";
import { Robot_Info_Service } from "./robot.service";
import { Working_Schedule } from "../../entities/working_schedule.entity";
import { Robot_Info_Repository } from "./robot.repository";
import { Robot_Info_Controller } from "./robot.controller";



@Module({
    imports:[
        TypeOrmModule.forFeature([Robot_Info,Working_Schedule]),
    ],
    providers:[Robot_Info_Service, Robot_Info_Repository],
    exports:[Robot_Info_Service],
    controllers:[Robot_Info_Controller],
})
export class Robot_Info_Module{}