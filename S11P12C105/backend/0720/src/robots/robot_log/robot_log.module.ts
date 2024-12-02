import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Robot_Log } from "../../entities/robot_log.entity";
import { Robot_Log_Service } from "./robot_log.service";
import { Robot_Log_Controller } from "./robot_log.controller";


@Module({
    imports:[
        TypeOrmModule.forFeature([Robot_Log]),
    ],
    providers:[Robot_Log_Service],
    exports:[Robot_Log_Service],
    controllers:[Robot_Log_Controller],
})
export class Robot_Log_Module{}