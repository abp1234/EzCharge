import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Working_Schedule } from "../entities/working_schedule.entity";
import { Working_Schedule_Repository } from "./working_schedule.repository";
import { CreateWorkingScheduleDto } from "./serializer(dto)/dto/create-working-schedule.dto";




@Injectable()
export class Working_Schedule_Service{
    constructor(
        @InjectRepository(Working_Schedule)
        private readonly working_schedule_repository: Working_Schedule_Repository,
    ){}

    async createWorking_Schedule(
        // User_Id:number,
        // Car_Info_Id                                                                                                                                                                                                                                                                                :number,
        // Parking_Area_Info_Id:number,
        // Parking_Coordinate_Info_Id:number,
        // Charge_Time:number,
        // Is_Finished:boolean,
        // Time:Date,
        createDto: CreateWorkingScheduleDto
    ): Promise<Working_Schedule>{

        return await this.working_schedule_repository.createWorkingSchedule(
            // User_Id, 
            // Car_Info_Id, 
            // Parking_Area_Info_Id,
            // Parking_Coordinate_Info_Id, 
            // Charge_Time, 
            // Is_Finished,
            // Time
            createDto
        );
        
    }
    async findByUserId(User_Id: number): Promise<Working_Schedule[]> {
        return this.working_schedule_repository.findByUserId(User_Id);
    }
}