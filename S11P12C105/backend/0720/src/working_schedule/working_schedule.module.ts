import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Working_Schedule } from "../entities/working_schedule.entity";
import { Working_Schedule_Service } from "./working_schedule.service";


@Module({
    imports:[
        TypeOrmModule.forFeature([Working_Schedule]),
    ],
    providers:[Working_Schedule_Service],
    exports:[Working_Schedule_Service],
    controllers:[Working_Schedule_Service],
})
export class Working_Schedule_Module{}