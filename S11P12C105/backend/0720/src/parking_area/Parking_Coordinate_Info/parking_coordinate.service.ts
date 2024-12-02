import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { Parking_Coordinate_Info } from "../../entities/parking_coordinate.entity";
// import { Working_Schedule } from "src/working_schedule/working_schedule.entity";
import { Parking_Coordinate_Repository } from "./parking_coordinate.repository";


@Injectable()
export class Parking_Coordinate_Info_Service{
    constructor(
        // @InjectRepository(Parking_Coordinate_Info)
        private readonly parking_coordinate_info_Repository: Parking_Coordinate_Repository,
    ){}

    async Post_Working_Schedule_For_RAPI(Parking_Area_Info_Id:number
        
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
        // const working_schedule=Working_Schedule.fillter(Parking_Area_Info_Id=Parking_Area_Info_Id&&Is_Finished='False');
        // working_schedule[0].Is_Finished=true;
        // await this.parking_coordinate_info_Repository.save(working_schedule);
        // const coordinate = Parking_Coordinate_Info.fillter(Parking_Coordinate_Info_Id=working_schedule[0].Parking_Coordinate_Info_Id);
        
        return this.parking_coordinate_info_Repository.Post_Working_Schedule_For_RAPI(Parking_Area_Info_Id);
    }
}