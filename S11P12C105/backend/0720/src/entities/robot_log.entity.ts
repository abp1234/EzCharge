import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, PrimaryColumn, Point } from 'typeorm';
import { Robot_Info } from './robot.entity';
import { Working_Schedule } from './working_schedule.entity';
import { Parking_Area_Info } from './parking_area.entity'; 
@Entity()
export class Robot_Log {
  @PrimaryGeneratedColumn()
  Robot_Log_Id!: number;

  @PrimaryColumn()
  Robot_Info_Id!: number;

  @PrimaryColumn()
  Working_Schedule_Id!: number;

  @PrimaryColumn()
  Parking_Area_Info_Id!: number;

  @Column({ type: 'varchar', length: 30, nullable: true })
  State!: string;

  @Column({ type: 'geometry', nullable: true })
  Robot_Coordinate_XY!:Point;

  @Column({ type: 'geometry', nullable: true })
  Robot_Coordinate_Z!:number;

  @Column({ type: 'geometry', nullable: true })
  Robot_Front_Coordinate_XY!:Point;

  @Column({ type: 'geometry', nullable: true })
  Robot_Front_Coordinate_ZW!:Point;

  @Column({ type: 'date', nullable: true })
  Time!: Date;

  @ManyToOne(() => Robot_Info, robotInfo => robotInfo.robotLogs)
  @JoinColumn([{ name: 'Robot_Info_Id' }, { name: 'Working_Schedule_Id' }, { name: 'Parking_Area_Info_Id' }])
  robotInfo!: Robot_Info;

  @ManyToOne(() => Working_Schedule, workingSchedule => workingSchedule.robotLogs)
  @JoinColumn({ name: 'Working_Schedule_Id' })
  workingSchedule!: Working_Schedule;

  @ManyToOne(() => Parking_Area_Info, parkingAreaInfo => parkingAreaInfo.robotLogs)
  @JoinColumn({ name: 'Parking_Area_Info_Id' })
  parkingAreaInfo!: Parking_Area_Info;
}