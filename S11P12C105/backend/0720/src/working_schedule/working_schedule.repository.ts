import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Working_Schedule } from "../entities/working_schedule.entity";
import { Repository } from "typeorm";



@Injectable()
export class Working_Schedule_Repository{
    constructor(
        @InjectRepository(Working_Schedule)
        private readonly working_schedule_repository: Repository<Working_Schedule>, 
    ){}

    async createWorkingSchedule(data: Partial<Working_Schedule>): Promise<Working_Schedule> {
        const workingSchedule = this.working_schedule_repository.create(data);
        return this.working_schedule_repository.save(workingSchedule);
    }

    async findByUserId(User_Id: number): Promise<Working_Schedule[]> {
        return this.working_schedule_repository.find({ where: { User_Id } });
    }
    // async createWorking_Schedule(
    //     User_Id: number,
    //     Car_Info_Id: number,
    //     Parking_Area_Info_Id: number,
    //     Parking_Coordinate_Info_Id:number,
    //     Charge_Time:number,
    //     Is_Finished: boolean,
    //     Time:Date,
    // ): Promise<Working_Schedule>{
    //     const newWorking_Schedule = this.working_schedule_repository.create({
    //         User_Id,Car_Info_Id,Parking_Area_Info_Id,Parking_Coordinate_Info_Id,
    //         Charge_Time,Is_Finished,Time
    //     })
    //     return await this.working_schedule_repository.save(newWorking_Schedule);
    // }
    
}