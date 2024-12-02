import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Point, Repository } from "typeorm";
import { Robot_Log } from "../../entities/robot_log.entity";


@Injectable()
export class Robot_Log_Repository{
    constructor(
        @InjectRepository(Robot_Log)
        private robot_log_Repository : Repository<Robot_Log>,
    ){}

    // 로봇 로그 생성
    async Create_Robot_Log(
        Robot_Info_Id:number,
        Parking_Area_Info_Id:number,
        State:string,
        Robot_Coordinate_XY:Point,
        Robot_Coordinate_Z:number,
        Robot_Front_Coordinate_XY:Point,
        Robot_Front_Coordinate_ZW:Point,
        Time:Date
    ): Promise<Robot_Log>{
        const robot_log = this.robot_log_Repository.create({
            Robot_Info_Id,
            Parking_Area_Info_Id,
            State,
            Robot_Coordinate_XY,
            Robot_Coordinate_Z,
            Robot_Front_Coordinate_XY,
            Robot_Front_Coordinate_ZW,
            Time,
        });
        return await this.robot_log_Repository.save(robot_log);
    }
}