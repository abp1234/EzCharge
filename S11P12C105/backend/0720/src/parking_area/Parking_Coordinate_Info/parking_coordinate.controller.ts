import { Body, Controller, Post } from "@nestjs/common";
import { Parking_Coordinate_Info_Service } from "./parking_coordinate.service";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Parking_Coordinate_InfoSerializer } from "./serializer(dto)/parking_coordinate.serializer";
import { CreateParkingCoordinateInfoDto } from "./serializer(dto)/dto/create-parking-coordinate-info.dto";


@ApiTags('Parking Coordinate Info') 
@Controller('parking_coordinate_info')
export class Parking_Coordinate_Info_Controller {
    constructor(private readonly parking_coordinate_info_service: Parking_Coordinate_Info_Service){}    

    @Post('register')
    @ApiOperation({ summary: '주차장 내부 좌표 등록' }) 
    @ApiBody({ type: Parking_Coordinate_InfoSerializer }) 
    @ApiResponse({ status: 200, description: '좌표가 성공적으로 RAPI에 전송되었습니다.', type: Parking_Coordinate_InfoSerializer })
    async Register_Parking_Coordinate_Info(@Body() body:CreateParkingCoordinateInfoDto
    // {Parking_Area_Info_Id:number}
){
        const {Parking_Area_Info_Id} =body;
        const newSchedule = await this.parking_coordinate_info_service.Post_Working_Schedule_For_RAPI(Parking_Area_Info_Id);
    
        return {
            "isSuccess":1,
            "code":200,
            "message":"성공적으로 RAPI에 좌표를 전송했습니다.",
            "result":{
                newSchedule:newSchedule,
            }
        }
    }
}