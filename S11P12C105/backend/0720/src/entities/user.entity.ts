import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Working_Schedule } from './working_schedule.entity'; 
import { Car_Info } from './car.entity'; 
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  User_Id!: number;

  @Column({ type: 'varchar', length: 30, nullable: true })
  Username!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Password!: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  Phone_Number!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Email!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Profile_Img!: string;

  @Column({ type: 'boolean',nullable: true, default:false})
  Is_Superuser!: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firebaseToken?: string;  // Firebase 토큰 추가

  @OneToMany(() => Car_Info, carInfo => carInfo.user)
  Cars!: Car_Info[];

  @OneToMany(() => Working_Schedule, workingSchedule => workingSchedule.user)
  WorkingSchedules!: Working_Schedule[];
}
