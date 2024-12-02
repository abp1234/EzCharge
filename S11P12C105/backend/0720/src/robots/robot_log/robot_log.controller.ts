import { Body, Controller, Post } from "@nestjs/common";
import { Robot_Log_Service } from "./robot_log.service";
import { Point } from "typeorm";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateRobotLogDto } from "./serializer(dto)/dto/create-robot-log.dto";
import { Robot_LogSerializer } from "./serializer(dto)/robot_log.serializer";


@Controller('Robot_Log')
export class Robot_Log_Controller{
    constructor(private readonly robot_log_service:Robot_Log_Service){}

    
    
    @ApiOperation({ summary: '로봇 로그 생성' })
    @ApiResponse({ status: 201, description: '로봇 로그가 성공적으로 생성되었습니다.', type: Robot_LogSerializer })
    @ApiResponse({ status: 403, description: '권한이 없습니다.' })
    @ApiBody({
        description: '로봇 로그 데이터',
        type: CreateRobotLogDto,
    })
    @Post('register')
    async Register_Robot_Log(@Body() createRobotLogDto: CreateRobotLogDto) {
        const New_Robot_Log = await this.robot_log_service.Create_Robot_Log(createRobotLogDto);
        return {
            isSuccess: 1,
            code: 200,
            message: '성공적으로 로봇 로그를 등록했습니다.',
            result: {
                Robot_Log: New_Robot_Log,
            },
        };
    }
    // async Register_Robot_Log(@Body() body:{
    //     Robot_Info_Id:number,
    //     Parking_Area_Info_Id:number,
    //     State:string,
    //     Robot_Coordinate_XY:Point,
    //     Robot_Coordinate_Z:number,
    //     Robot_Front_Coordinate_XY:Point,
    //     Robot_Front_Coordinate_ZW:Point,
    //     Time:Date
    // }){
    //     const {Robot_Info_Id,Parking_Area_Info_Id,State,
    //         Robot_Coordinate_XY,Robot_Coordinate_Z,
    //         Robot_Front_Coordinate_XY,
    //         Robot_Front_Coordinate_ZW,
    //         Time
    //     }=body;
    //     const New_Robot_Log = await this.robot_log_service.Create_Robot_Log(
    //         Robot_Info_Id, Parking_Area_Info_Id, State,
    //         Robot_Coordinate_XY, Robot_Coordinate_Z,
    //         Robot_Front_Coordinate_XY, Robot_Front_Coordinate_ZW,
    //         Time
    //     )
    //     return {"isSuccess" : 1,
    //         "code" : 200,
    //         "message": "성공적으로 로봇 로그를 등록했습니다.",
    //         "result":{
    //             Robot_Log: New_Robot_Log,
    //         }
    // };
}
