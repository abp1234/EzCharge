import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, PrimaryColumn, OneToOne } from 'typeorm';
import { Parking_Area_Info } from './parking_area.entity'; 
import { User } from './user.entity'; 
import { Car_Info } from './car.entity';
import { Parking_Coordinate_Info } from './parking_coordinate.entity'; 
// import { Robot_Info } from './robot.entity'; 
import { Robot_Log } from './robot_log.entity';
@Entity()
export class Working_Schedule {
  @PrimaryGeneratedColumn()
  Working_Schedule_Id!: number;

  @PrimaryColumn()
  User_Id!: number;

  @PrimaryColumn()
  Car_Info_Id!: number;

  @PrimaryColumn()
  Parking_Coordinate_Info_Id!: number;

  @PrimaryColumn()
  Parking_Area_Info_Id!: number;

  @Column({ type: 'int', nullable: true })
  Charge_Time!: number;

  @Column()
  Is_Finished!:boolean;

  @Column()
  Time!:Date;

  @ManyToOne(() => User, user => user.WorkingSchedules)
  @JoinColumn({ name: 'User_Id' })
  user!: User;

  @ManyToOne(() => Car_Info, car => car.workingSchedules)
  @JoinColumn({ name: 'Car_Id' })
  car!: Car_Info;

  @ManyToOne(() => Parking_Coordinate_Info, parkingCoordinateInfo => parkingCoordinateInfo.workingSchedules)
  @JoinColumn({ name: 'Parking_Coordinate_Info_Id' })
  parkingCoordinateInfo!: Parking_Coordinate_Info;

  @ManyToOne(() => Parking_Area_Info, parkingAreaInfo => parkingAreaInfo.workingSchedules)
  @JoinColumn({ name: 'Parking_Area_Info_Id' })
  parkingAreaInfo!: Parking_Area_Info;

  @OneToMany(() => Robot_Log, robotLog => robotLog.workingSchedule)
  robotLogs!: Robot_Log[];
}