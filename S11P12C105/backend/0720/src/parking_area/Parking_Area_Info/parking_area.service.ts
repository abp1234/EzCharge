import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Parking_Area_Info } from "../../entities/parking_area.entity"; 

@Injectable()
export class Parking_Area_Info_Service{
    constructor(
        @InjectRepository(Parking_Area_Info)
        private readonly parking_area_info_Repository: Repository<Parking_Area_Info>,
    ){}
    async findAll(): Promise<Parking_Area_Info[]> {
        return this.parking_area_info_Repository.find();
    }

    async findParking_Area_InfoById(Parking_Area_Info_Id: number): Promise<Parking_Area_Info | null> {
        return this.parking_area_info_Repository.findOne({ where: { Parking_Area_Info_Id } });
    }
}