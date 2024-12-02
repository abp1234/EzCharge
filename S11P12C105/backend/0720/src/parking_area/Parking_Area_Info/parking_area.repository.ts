import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Point, Repository } from "typeorm";
import { Parking_Area_Info } from "../../entities/parking_area.entity"; 


@Injectable()
export class Parking_Area_Info_Service{
    constructor(
        @InjectRepository(Parking_Area_Info)
        private parking_area_info_Repository:Repository<Parking_Area_Info>
    ){}

    async findParking_Area_InfoByParking_Area_Info_Id(Parking_Area_Info_Id:number): Promise<Parking_Area_Info[]|undefined>{
        return this.parking_area_info_Repository.find({where:{Parking_Area_Info_Id}});
    }
}