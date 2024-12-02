import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RobotControl } from '../../entities/robot-control.entity'; 
import { CreateRobotControlDto } from './serializer(dto)/dto/create-robot-control.dto'; 
import { Robot_Log } from '../../entities/robot_log.entity';

@Injectable()
export class RobotControlRepository {
    constructor(
        @InjectRepository(RobotControl)
        private robotControlRepository: Repository<RobotControl>,
        private robot_log_Repository: Repository<Robot_Log>,
    ) {}
    /**
     * 로봇 정보를 ID로 찾음
     * @param id - 찾고자 하는 로봇의 ID
     * @returns Promise<RobotControl> - 찾은 로봇 정보
     */
    async findRobotById(id: number): Promise<RobotControl | null> {
        return await this.robotControlRepository.findOne({ where: { id } });
    }

    /**
     * 로봇 정보를 저장함
     * @param robot - 저장하고자 하는 로봇 정보
     * @returns Promise<RobotControl> - 저장된 로봇 정보
     */
    async saveRobotControl(robot: RobotControl): Promise<RobotControl> {
        return await this.robotControlRepository.save(robot);
    }

    /**
     * 로봇 정보를 업데이트함
     * @param id - 업데이트할 로봇의 ID
     * @param controlDto - 업데이트할 로봇 정보 DTO
     * @returns Promise<RobotControl> - 업데이트된 로봇 정보
     * @throws Error - 로봇 정보를 찾을 수 없을 때 발생
     */
    async updateRobotControl(id: number, controlDto: CreateRobotControlDto): Promise<RobotControl> {
        // ID로 로봇 정보 찾기
        const robot = await this.findRobotById(id);
        if (!robot) {
            throw new Error('로봇 정보를 찾을 수 없습니다.');
        }

        // 로봇 정보 업데이트
        robot.direction = controlDto.direction;
        robot.speed = controlDto.speed;
        robot.isCharging = controlDto.isCharging;

        // 업데이트된 로봇 정보 저장 및 반환
        return await this.saveRobotControl(robot);
    }
    // 로봇 로그 조회
    async Get_Robot_Log(id: number): Promise<Robot_Log|null> {
        return await this.robot_log_Repository.findOne({ where: { Robot_Log_Id: id } });
    }
}