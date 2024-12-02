import { Controller, Put, Param, Body, Get } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RobotControlService } from './robot-control.service';
import { CreateRobotControlDto } from './serializer(dto)/dto/create-robot-control.dto';
import { Robot_LogSerializer } from '../robot_log/serializer(dto)/robot_log.serializer';

@ApiTags('Robot Control')
@Controller('robot-control')
export class RobotControlController {
    constructor(private readonly robotControlService: RobotControlService) {}

    @Put(':id')
    @ApiOperation({ summary: '로봇 제어' })
    async controlRobot(
        @Param('id') id: number,
        @Body() createRobotControlDto: CreateRobotControlDto,
    ) {
        const robot = await this.robotControlService.controlRobot(id, createRobotControlDto);
        return {
            isSuccess: 1,
            code: 200,
            message: '로봇 상태가 성공적으로 변경되었습니다.',
            result: {
                robot,
            },
        };
    }
    @ApiOperation({ summary: '로봇 로그 조회' })
    @ApiResponse({ status: 200, description: '로봇 로그를 조회했습니다.', type: Robot_LogSerializer })
    @ApiResponse({ status: 404, description: '로봇 로그를 찾을 수 없습니다.' })
    @ApiParam({ name: 'id', description: '로봇 로그 ID', type: Number })
    @Get(':id')
    async Get_Robot_Log(@Param('id') id: number) {
        const robotLog = await this.robotControlService.Get_Robot_Log(id);
        return {
            isSuccess: 1,
            code: 200,
            message: '성공적으로 로봇 로그를 조회했습니다.',
            result: {
                Robot_Log: robotLog,
            },
        };
    }
}
