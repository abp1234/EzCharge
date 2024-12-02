import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RobotControl {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 10 })
    direction!: string;

    @Column({ type: 'int' })
    speed!: number;

    @Column({ type: 'boolean' })
    isCharging!: boolean;
}