import { Entity, Column, PrimaryGeneratedColumn, OneToMany,ManyToOne,PrimaryColumn,JoinColumn, Point } from 'typeorm';
import { Working_Schedule } from './working_schedule.entity';
import { Parking_Area_Info } from './parking_area.entity';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 주차장 내부 좌표 정보 엔티티
 * @entity Parking_Coordinate_Info
 */
@Entity()
export class Parking_Coordinate_Info {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '주차장 내부 좌표 ID' })
  Parking_Coordinate_Info_Id!: number;

  @PrimaryColumn()
  @ApiProperty({ description: '위치 인덱스', example: 'A1' })
  Parking_Area_Info_Id!: number;

  @Column({ type: 'varchar', length: 30, nullable: true })
  @ApiProperty({ description: '좌표 X와 Y', type: 'object', example: { type: 'Point', coordinates: [1.0, 2.0] } })
  Idx!: string;

  @Column({ type: 'geometry', nullable: true })
  @ApiProperty({ description: '좌표 Z', example: 3.0 })
  Coordinate_XY!: Point;

  @Column({ type: 'geometry', nullable: true })
  @ApiProperty({ description: '앞쪽 좌표 X와 Y', type: 'object', example: { type: 'Point', coordinates: [4.0, 5.0] } })
  Coordinate_Z!: number;

  @Column({ type: 'geometry', nullable: true })
  @ApiProperty({ description: '앞쪽 좌표 ZW', type: 'object', example: { type: 'Point', coordinates: [6.0, 7.0] } })
  Front_Coordinate_XY!: Point;

  @Column({ type: 'geometry', nullable: true })
  Front_Coordinate_ZW!: Point;

  @ManyToOne(() => Parking_Area_Info, parkingAreaInfo => parkingAreaInfo.parkingCoordinates)
  @JoinColumn({ name: 'Parking_Area_Info_Id' })
  @ApiProperty({ description: '주차장 정보', type: () => Parking_Area_Info })
  parkingAreaInfo!: Parking_Area_Info;

  @OneToMany(() => Working_Schedule, workingSchedule => workingSchedule.parkingCoordinateInfo)
  @ApiProperty({ description: '작업 스케줄 목록', type: () => [Working_Schedule] })
  workingSchedules!: Working_Schedule[];
}