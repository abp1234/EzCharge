import { ApiProperty } from '@nestjs/swagger';

export class GetWorkingScheduleDto {
    @ApiProperty({ description: '사용자 ID', example: 1 })
    User_Id!: number;

    @ApiProperty({ description: '예약 ID', example: 1 })
    Working_Schedule_Id!: number;
}
