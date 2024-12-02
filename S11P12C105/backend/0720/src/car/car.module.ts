import { Module } from "@nestjs/common";
import { Car_Info } from "../entities/car.entity";
import { CarService } from "./car.service";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports:[
        TypeOrmModule.forFeature([Car_Info]),
    ],
    providers:[CarService],
    exports:[CarService],
    controllers:[CarService],
})
export class Car_InfoModule{}