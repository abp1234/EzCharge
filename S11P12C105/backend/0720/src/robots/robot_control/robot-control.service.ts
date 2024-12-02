import { Injectable } from '@nestjs/common';
import { CreateRobotControlDto } from './serializer(dto)/dto/create-robot-control.dto'; 
import { RobotControl } from '../../entities/robot-control.entity';
import { RobotControlRepository } from './robot-control.repository';
import { Robot_Log } from '../../entities/robot_log.entity';

@Injectable()
export class RobotControlService {
    constructor(
        private readonly robotControlRepository: RobotControlRepository,
        
    ) {}

    async controlRobot(id: number, controlDto: CreateRobotControlDto): Promise<RobotControl> {
        return await this.robotControlRepository.updateRobotControl(id, controlDto);
    }
    // 로봇 로그 조회
    async Get_Robot_Log(id: number): Promise<Robot_Log|null> {
        return await this.robotControlRepository.Get_Robot_Log(id);
    }
}