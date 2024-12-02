import { Exclude, Expose, Type } from 'class-transformer';
import { UserSerializer } from '../../user/serializer(dto)/user.serializer'; 
import { ApiProperty } from '@nestjs/swagger';
export class Car_InfoSerializer {
    @Expose()
    @ApiProperty({ 
        example: 1, 
        description: '차량 정보 ID' 
    })
    Car_Info_Id!: number;

    @Expose()
    @ApiProperty({ 
        example: 1, 
        description: '사용자 ID' 
    })
    @Type(() => UserSerializer)
    User_Id!: number;

    @Expose()
    @ApiProperty({ 
        example: '123ABC', 
        description: '차량 번호' 
    })
    Car_number!: string;

    // @Expose()
    // @ApiProperty({
    //     type: [Working_ScheduleSerializer],
    //     description: '작업 일정',
    //     isArray: true,
    // })
    // @Type(() => Working_ScheduleSerializer)
    // workingSchedules: Working_ScheduleSerializer[];

}