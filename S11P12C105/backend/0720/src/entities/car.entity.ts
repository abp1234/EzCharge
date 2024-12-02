import { Entity, Column, OneToMany, ManyToOne,JoinColumn, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { User } from './user.entity'; 
import { Working_Schedule } from './working_schedule.entity'; 

@Entity()
export class Car_Info {
  @PrimaryGeneratedColumn()
  Car_Info_Id!: number;

  @PrimaryColumn()
  User_Id!: number;

  @Column({ type: 'varchar', length: 30, nullable: true })
  Car_number!: string;

  @ManyToOne(() => User, user => user.Cars)
  @JoinColumn({ name: 'User_Id' })
  user!: User;

  @OneToMany(() => Working_Schedule, workingSchedule => workingSchedule.car)
  workingSchedules!: Working_Schedule[];
}