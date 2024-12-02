import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
// import { Working_Schedule } from "src/working_schedule/working_schedule.entity";
import { Repository } from "typeorm";
import { Robot_Info } from "../../entities/robot.entity";
import { Working_Schedule } from "../../entities/working_schedule.entity";
import { MqttService } from "../../mqtt/mqtt.service";


@Injectable()
export class Robot_Info_Repository{
    constructor(
        @InjectRepository(Robot_Info)
        private robot_Info_repository: Repository<Robot_Info>,
        @InjectRepository(Working_Schedule)
        private workingScheduleRepository: Repository<Working_Schedule>,
        private mqttService: MqttService,
    ){}

    // 로봇 상태 업데이트
    async updateRobot_Info(Robot_Info_Id:number, State:string): Promise<Robot_Info>{
        const robot_Info=await this.robot_Info_repository.findOneBy({Robot_Info_Id});
        if (!robot_Info) {
            throw new Error('로봇 정보를 찾을 수 없습니다.');
        }
        // 로봇 상태 설정
        if(State==='충전 가능'){
            robot_Info.State=true;
        }
        else{
            robot_Info.State=false;
        }
        
        await this.robot_Info_repository.save(robot_Info);
        // 관련된 Working_Schedule 업데이트
        const workingSchedules = await this.workingScheduleRepository.find({ where: { Parking_Area_Info_Id: robot_Info.Parking_Area_Info_Id } });
        let flag=0;
        for (const schedule of workingSchedules) {
            if(flag===0&&schedule.Is_Finished ===false){
                schedule.Is_Finished = robot_Info.State;
                await this.workingScheduleRepository.save(schedule);
                flag=1;
                // RAPI5로 상태 업데이트 전송
                // this.mqttService.publish('robot/update', JSON.stringify({
                //     robotId: Robot_Info_Id,
                //     // state: robot_Info.State,
                //     // 그 다음 f
                // }));
            }else if(flag===1&&schedule.Is_Finished ===false){
                // RAPI5로 상태 업데이트 전송
                this.mqttService.publish('robot/update', JSON.stringify({
                    next_schedule:schedule,
                }));
                flag=2;
                break;
            }
        }
        if(flag===1){
            // RAPI5로 상태 업데이트 전송
            this.mqttService.publish('robot/update', JSON.stringify({
                next_schedule:"NO_Schdeule",
            }));
        }

        return robot_Info;
    }
}