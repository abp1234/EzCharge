import { Entity, Column, PrimaryGeneratedColumn, OneToMany,ManyToOne,PrimaryColumn,JoinColumn, Point } from 'typeorm';
import { Working_Schedule } from './working_schedule.entity'; 
import { Parking_Coordinate_Info } from './parking_coordinate.entity'; 
import { Robot_Info } from './robot.entity';
import { Robot_Log } from './robot_log.entity';

@Entity()
export class Parking_Area_Info {
    @PrimaryGeneratedColumn()
    Parking_Area_Info_Id!: number;

    @Column({ type: 'varchar', length: 30, nullable: true })
    name!: string;

    @Column({ type: 'geometry', nullable: true })
    GPS_location!: Point;

    @Column({ type: 'varchar', length: 255, nullable: true })
    Structure!: string;

    @OneToMany(() => Parking_Coordinate_Info, parkingCodinateInfo => parkingCodinateInfo.parkingAreaInfo)
    parkingCoordinates!: Parking_Coordinate_Info[];

    @OneToMany(() => Robot_Info, robotInfo => robotInfo.parkingAreaInfo)
    robots!: Robot_Info[];

    @OneToMany(() => Robot_Log, robotLog => robotLog.parkingAreaInfo)
    robotLogs!: Robot_Log[];

    @OneToMany(() => Working_Schedule, workingSchedule => workingSchedule.parkingAreaInfo)
    workingSchedules!: Working_Schedule[];
}