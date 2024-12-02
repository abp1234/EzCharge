import { Body, Controller, Put } from "@nestjs/common";
import { Robot_Info_Service } from "./robot.service";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Robot_InfoSerializer } from "./serializer(dto)/robot.serializer";



@Controller('robot_Info')
export class Robot_Info_Controller{
    constructor(private readonly robot_info_service:Robot_Info_Service){}

    @Put('update')
    @ApiOperation({ summary: '로봇 상태 업데이트', description: '로봇의 상태를 업데이트합니다.' })
    @ApiBody({
        description: '로봇 정보 업데이트 데이터',
        type: Robot_InfoSerializer,
    })
    @ApiResponse({
        status: 200,
        description: '성공적으로 로봇 상태를 변경했습니다.',
        type: Robot_InfoSerializer,
    })
    async updateRobot_Info(@Body() body:{Robot_Info_Id:number, State:string}){
        const {Robot_Info_Id,State}=body;
        const update_Robot_Info = await this.robot_info_service.updateRobot_Info(Robot_Info_Id, State);
        return {
            "isSuccess" : 1,
            "code" : 200,
            "message": "성공적으로 로봇 상태를 변경했습니다.",
            "result":{
                Update_Robot_Info:update_Robot_Info,
            }
    };
        }
    }
