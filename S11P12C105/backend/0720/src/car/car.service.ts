import { InjectRepository } from "@nestjs/typeorm";
import { Car_Info } from "../entities/car.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Car_Info_Repository } from "./car.repository";



@Injectable()
export class CarService{
    constructor(
       @InjectRepository(Car_Info)
       private readonly carRepository: Car_Info_Repository,
    ){}

    // 차량 생성
    async createCar(User_Id: number, Car_number: string): Promise<Car_Info> {
        return this.carRepository.createCar(User_Id, Car_number);
    }

    // 차량 조회 (ID로 찾기)
    async findCarById(id: number): Promise<Car_Info | null> {
        return this.carRepository.findCarById(id);
    }

    // 차량 수정
    async updateCar(id: number, updateData: Partial<Car_Info>): Promise<Car_Info | null> {
        return this.carRepository.updateCar(id, updateData);
    }

    // 차량 삭제
    async deleteCar(id: number): Promise<void> {
        await this.carRepository.deleteCar(id);
    }

    // 모든 차량 조회
    async findAllCars(): Promise<Car_Info[]> {
        return this.carRepository.findAllCars();
    }
}