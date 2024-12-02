import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWorkingScheduleDto {
    @ApiProperty({ description: '사용자 ID', example: 1 })
    @IsInt()
    @IsNotEmpty()
    User_Id!: number;

    @ApiProperty({ description: '차량 정보 ID', example: 1 })
    @IsInt()
    @IsNotEmpty()
    Car_Info_Id!: number

    @ApiProperty({ description: '주차장 영역 정보 ID', example: 1 })
    @IsInt()
    @IsNotEmpty()
    Parking_Area_Info_Id!: number

    @ApiProperty({ description: '주차장 좌표 정보 ID', example: 1 })
    @IsInt()
    @IsNotEmpty()
    Parking_Coordinate_Info_Id!: number

    @ApiProperty({ description: '충전 시간', example: 60 })
    @IsInt()
    @IsNotEmpty()
    Charge_Time!: number

    @ApiProperty({ description: '완료 여부', example: true })
    @IsBoolean()
    @IsNotEmpty()
    Is_Finished: boolean=false;

    @ApiProperty({ description: '예약 시간', example: '2024-07-21T12:00:00Z' })
    @IsDate()
    @IsNotEmpty()
    Time: Date= new Date();
    
    @ApiProperty({ description: '사용자의 Firebase Token', example: 'user-firebase-token' })
    @IsString()
    @IsOptional()
    readonly firebaseToken?: string;
}
