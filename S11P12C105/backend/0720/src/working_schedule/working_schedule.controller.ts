import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { Working_Schedule_Service } from "./working_schedule.service";
import { working_schedules } from "../common/decorators/working_schedule.decorators"; 
import { Working_Schedule } from "../entities/working_schedule.entity";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { CreateWorkingScheduleDto } from "./serializer(dto)/dto/create-working-schedule.dto";
import { NotificationService } from "../notification/notification.service";

@Controller('Working_Schedule')
export class Working_Schedule_Controller{
    constructor(
        private readonly working_schedule_service:Working_Schedule_Service,
        private readonly notificationService: NotificationService,
    ){}

    @Post('register')
    @ApiOperation({ summary: '예약 등록' })
    @ApiBody({ type: CreateWorkingScheduleDto })
    @ApiResponse({
        status: 201,
        description: '성공적으로 예약을 등록했습니다.',
        type: Working_Schedule,
    })
    async registerWorkingSchedule(@Body() createDto: CreateWorkingScheduleDto) {
        const newWorkingSchedule = await this.working_schedule_service.createWorking_Schedule(createDto);
        

        // 알림 전송
        if(createDto.firebaseToken){
            await this.notificationService.sendNotification(
            createDto.firebaseToken,
            '예약 생성 완료',
            `예약이 성공적으로 생성되었습니다. 예약 ID: ${newWorkingSchedule.Working_Schedule_Id}`,
        );
        }
        
        
        return {
            isSuccess: 1,
            code: 200,
            message: "성공적으로 예약을 등록했습니다.",
            result: { Working_Schedule: newWorkingSchedule },
        };
    }
    @Get('user')
    @ApiOperation({ summary: '사용자 예약 조회' })
    @ApiQuery({ name: 'User_Id', type: Number, description: '사용자 ID' })
    @ApiResponse({
        status: 200,
        description: '사용자에 대한 예약 정보를 가져왔습니다.',
        type: [Working_Schedule],
    })
    async getWorkingSchedules(@Query('User_Id') User_Id: number) {
        const schedules = await this.working_schedule_service.findByUserId(User_Id);
        return {
            isSuccess: 1,
            code: 200,
            message: "성공적으로 예약 정보를 가져왔습니다.",
            result: { Working_Schedules: schedules },
        };
    }
}


// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Working_Schedule } from "./working_schedule.entity";
// import { Repository } from "typeorm";
// import { timeStamp } from "console";


// @Injectable()
// export class Working_Schedule_Service {
//     constructor(
//         @InjectRepository(Working_Schedule)
//         private workingRepository: Repository<Working_Schedule>,
//     ){}

//     async createWorking_Schedule_Service(
//         User_Id: number,
//         Car_Info_Id: number,
//         Parking_Area_Info_Id: number,
//         Parking_Codinate_Info_Id:number,
//         Charge_Time:number,
//         Is_Finished:Boolean,
//     ): Promise<Working_Schedule>{
//         const working_schedule = new Working_Schedule();
//         working_schedule.User_Id=User_Id,
//         working_schedule.Car_Info_Id= Car_Info_Id,
//         working_schedule.Parking_Area_Info_Id=Parking_Area_Info_Id,
//         working_schedule.Parking_Codinate_Info_Id=Parking_Codinate_Info_Id,
//         working_schedule.Charge_Time=Charge_Time,
//         working_schedule.Is_Finished=Is_Finished,
//         working_schedule.Time = timeStamp();
//         await this.workingRepository,save(working_schedule);
//         return working_schedule;
//     }

//     async findWorking_ScheduleByUser_Id(User_Id:number): Promise<Working_Schedule|undefined>{
//         return this.workingRepository.find({where : {User_Id}});
//     }
// }