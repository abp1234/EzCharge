import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RobotControlService } from './robot-control.service';
import { RobotControlController } from './robot-control.controller';
import { RobotControl } from '../../entities/robot-control.entity';
import { RobotControlRepository } from './robot-control.repository';

@Module({
    imports: [TypeOrmModule.forFeature([RobotControl])],
    providers: [RobotControlService, RobotControlRepository],
    controllers: [RobotControlController],
})
export class RobotControlModule {}
