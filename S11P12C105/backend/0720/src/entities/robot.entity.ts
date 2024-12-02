import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, PrimaryColumn, OneToOne } from 'typeorm';
import { Parking_Area_Info } from './parking_area.entity'; 
import { Robot_Log } from './robot_log.entity';
@Entity()
export class Robot_Info {
  @PrimaryGeneratedColumn()
  Robot_Info_Id!: number;

  @PrimaryColumn()
  Parking_Area_Info_Id!: number;

  @Column({ type: 'boolean', nullable: true })
  State!: boolean;

  @ManyToOne(() => Parking_Area_Info, parkingAreaInfo => parkingAreaInfo.robots)
  @JoinColumn({ name: 'Parking_Area_Info_Id' })
  parkingAreaInfo!: Parking_Area_Info;

  @OneToMany(() => Robot_Log, robotLog => robotLog.robotInfo)
  robotLogs!: Robot_Log[];
}