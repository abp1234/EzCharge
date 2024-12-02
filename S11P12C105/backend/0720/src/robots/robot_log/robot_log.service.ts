import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Point, Repository } from "typeorm";
import { Robot_Log } from "../../entities/robot_log.entity";
import { Robot_Log_Repository } from "./robot_log.repository";
import { CreateRobotLogDto } from "./serializer(dto)/dto/create-robot-log.dto";


@Injectable()
export class Robot_Log_Service{
    constructor(
        @InjectRepository(Robot_Log)
        private readonly robot_log_repository: Robot_Log_Repository,
    ){}

    // 로봇 로그 생성
    async Create_Robot_Log(createRobotLogDto: CreateRobotLogDto): Promise<Robot_Log> {
        return await this.robot_log_repository.Create_Robot_Log(
            createRobotLogDto.Robot_Info_Id,
            createRobotLogDto.Parking_Area_Info_Id,
            createRobotLogDto.State,
            createRobotLogDto.Robot_Coordinate_XY,
            createRobotLogDto.Robot_Coordinate_Z,
            createRobotLogDto.Robot_Front_Coordinate_XY,
            createRobotLogDto.Robot_Front_Coordinate_ZW,
            createRobotLogDto.Time
        );
    }
}