import { ApiProperty } from '@nestjs/swagger';

export class CreateRobotControlDto {
    @ApiProperty({ example: 'FORWARD', description: '로봇의 방향 (FORWARD, BACKWARD, LEFT, RIGHT)' })
    direction!: string;

    @ApiProperty({ example: 100, description: '로봇의 이동 속도' })
    speed!: number;

    @ApiProperty({ example: true, description: '충전 여부' })
    isCharging!: boolean;
}