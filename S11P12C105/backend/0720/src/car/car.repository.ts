import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car_Info } from "../entities/car.entity";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity"; 


@Injectable()
export class Car_Info_Repository{
    constructor(
        @InjectRepository(Car_Info)
        private carRepository: Repository<Car_Info>, 
    ){}

    // 차량 생성
    async createCar(User_Id: number, Car_number: string): Promise<Car_Info> {
        const car = this.carRepository.create({ User_Id, Car_number });
        return this.carRepository.save(car);
    }

    // 차량 ID로 조회
    async findCarById(id: number): Promise<Car_Info | null> {
        return this.carRepository.findOne({ where: { Car_Info_Id: id } });
    }

    // 사용자 ID로 차량 조회
    async findCarByUserId(User_Id: number): Promise<Car_Info | null> {
        return this.carRepository.findOne({ where: { User_Id } });
    }

    // 차량 번호로 조회
    async findCarByCarNumber(Car_number: string): Promise<Car_Info | null> {
        return this.carRepository.findOne({ where: { Car_number } });
    }

    // 차량 수정
    async updateCar(id: number, updateData: Partial<Car_Info>): Promise<Car_Info | null> {
        await this.carRepository.update(id, updateData);
        return this.carRepository.findOne({ where: { Car_Info_Id: id } });
    }

    // 차량 삭제
    async deleteCar(id: number): Promise<void> {
        await this.carRepository.delete(id);
    }

    // 모든 차량 조회
    async findAllCars(): Promise<Car_Info[]> {
        return this.carRepository.find();
    }
}