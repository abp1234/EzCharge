import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CarService } from "./car.service";
import { Cars } from "../common/decorators/car.decorators"; 
import { Car_Info } from "../entities/car.entity";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateCarDto } from "./serializer(dto)/dto/update-car.dto";
import { CreateCarDto } from "./serializer(dto)/dto/create-car.dto";


@ApiTags('Car')
@Controller('car')
export class CarController {
    constructor(private carService:CarService){}

    @Post('register')
    @ApiOperation({ summary: '차량 등록' })
    @ApiBody({ type: CreateCarDto })
    @ApiResponse({
        status: 201,
        description: '차량이 성공적으로 등록되었습니다.',
        type: Car_Info,
    })
    async registerCar(@Body() body: {User_Id:number, Car_number:string}){
        const {User_Id, Car_number}=body;
        const newCar = await this.carService.createCar(User_Id, Car_number);
        return {"isSuccess" : 1,
                "code" : 200,
                "message": "성공적으로 차량을 등록했습니다.",
                "result":{
                    car:newCar
                }
        };
    }
    @Get()
    @ApiOperation({ summary: '차량 정보 조회' })
    @ApiParam({ name: 'id', type: Number, description: '차량 ID' })
    @ApiResponse({
        status: 200,
        description: '차량 정보를 성공적으로 가져왔습니다.',
        type: Car_Info,
    })
    async getCar(@Cars() car:Car_Info){
        return {"isSuccess" : 1,
            "code" : 200,
            "message": "성공적으로 차량 정보 데이터를 가져왔습니다.",
            "result":{
                car:car
            }
        }||false;
    }
    @Put(':id')
    @ApiOperation({ summary: '차량 정보 수정' })
    @ApiParam({ name: 'id', type: Number, description: '차량 ID' })
    @ApiBody({ type: UpdateCarDto })
    @ApiResponse({
        status: 200,
        description: '차량 정보가 성공적으로 수정되었습니다.',
        type: Car_Info,
    })
    async updateCar(@Param('id') id: number, @Body() body: UpdateCarDto) {
        const updatedCar = await this.carService.updateCar(id, body);
        if (updatedCar) {
        return {
            isSuccess: 1,
            code: 200,
            message: "성공적으로 차량 정보를 수정했습니다.",
            result: { car: updatedCar },
        };
        }
        return { isSuccess: 0, code: 404, message: "차량을 찾을 수 없습니다." };
    }
    @Delete(':id')
    @ApiOperation({ summary: '차량 삭제' })
    @ApiParam({ name: 'id', type: Number, description: '차량 ID' })
    @ApiResponse({
        status: 200,
        description: '차량이 성공적으로 삭제되었습니다.',
    })
    async deleteCar(@Param('id') id: number) {
        await this.carService.deleteCar(id);
        return {
        isSuccess: 1,
        code: 200,
        message: "차량이 성공적으로 삭제되었습니다.",
        };
    }
}
