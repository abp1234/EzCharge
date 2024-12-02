import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Parking_Coordinate_Info } from "../../entities/parking_coordinate.entity";
import { Repository } from "typeorm";
import { Working_Schedule } from "../../entities/working_schedule.entity"; 

@Injectable()
export class Parking_Coordinate_Repository{
    constructor(
        @InjectRepository(Parking_Coordinate_Info)
        private readonly parking_coordinate_info_repository: Repository<Parking_Coordinate_Info>,
    
        @InjectRepository(Working_Schedule)
        private readonly working_schedule_Repository: Repository<Working_Schedule>
    ){}

    async Post_Working_Schedule_For_RAPI(
        // User_Id:number,
        // Car_Info_Id:number,
        // Parking_Coordinate_Info_Id:number,
        Parking_Area_Info_Id:number, 
        // Charge_Time:number, 
        // Is_Finished:Boolean,
        // Time:Date
    ){
        // const working_schedule = new Working_Schedule();
        // working_schedule.User_Id=User_Id;
        // working_schedule.Car_Info_Id=Car_Info_Id;
        // working_schedule.Parking_Coordinate_Info_Id=Parking_Coordinate_Info_Id;
        // working_schedule.Parking_Area_Info_Id=Parking_Area_Info_Id;
        // working_schedule.Charge_Time=Charge_Time;
        // working_schedule.Is_Finished =Is_Finished;
        // working_schedule.Time=Time;

        // await this.parking_coordinate_info_repository.save(working_schedule);
        // const working_schedule= await this.working_schedule_Repository.fillter(Car_Info_Id=Car_Info_Id&&Is_Finished='False');
        const working_schedule = await this.working_schedule_Repository.findOne({
            where:{
                Parking_Area_Info_Id:Parking_Area_Info_Id,
                Is_Finished:false,
            }
        })
        if(working_schedule){
            working_schedule.Is_Finished=true;
            await this.parking_coordinate_info_repository.save(working_schedule);
        
            // const coordinate = Parking_Coordinate_Info.fillter(Parking_Coordinate_Info_Id=working_schedule[0].Parking_Coordinate_Info_Id);
            const coordinate = await this.parking_coordinate_info_repository.findOne({
                where:{
                    Parking_Coordinate_Info_Id:working_schedule.Parking_Coordinate_Info_Id
                }
            })
            return coordinate;
        }
        return undefined;
    }
}