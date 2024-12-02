// import { InjectRepository } from "@nestjs/typeorm";
import { Robot_Info } from "../../entities/robot.entity";
// import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Robot_Info_Repository } from "./robot.repository";


@Injectable()
export class Robot_Info_Service{
    constructor(
        // @InjectRepository(Robot_Info)
        private readonly Robot_Info_Repository: Robot_Info_Repository,
    ){}

    // 로봇 상태 업데이트
    async updateRobot_Info(Robot_Info_Id:number,State:string):Promise<Robot_Info>{
        return this.Robot_Info_Repository.updateRobot_Info(Robot_Info_Id,State);
    //     let flag=false;
    //     if(State==='충전 가능'){
    //         flag=true;
    //     }
    // //     const update_Robot_Info =this.Robot_Info_Repository[idx].update({
    // //         State:flag,
    // //    })

    //     const update_Robot_Info = await this.Robot_Info_Repository.findOneBy({Robot_Info_Id})
    //     update_Robot_Info.State=flag;
    //     return  await this.Robot_Info_Repository.save(update_Robot_Info); 
    }
}