import { Controller, Get, Post, Query } from "@nestjs/common";
import { Parking_Area_Info_Service } from "./parking_area.service";
import { Parking_Area_Infos } from "../../common/decorators/parking_area.decorators";
import { Parking_Area_Info } from "../../entities/parking_area.entity"; 
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Parking_Area_InfoSerializer } from "./serializer(dto)/parking_area.serializer";


@ApiTags('주차장 정보')
@Controller('Parking_Area_Info')
export class Parking_Area_Info_Controller{
    constructor(private readonly parking_area_info_service:Parking_Area_Info_Service){}
    private LoM(A: number, B: number, C: number, D: number): number{
        return Math.sqrt(Math.pow(Math.abs(C-A),2)+Math.pow(Math.abs(D-B),2))
    }

    @ApiOperation({ summary: '주차장 정보 조회' })
    @ApiResponse({ status: 200, description: '주차장 정보를 반환합니다.', type: [Parking_Area_InfoSerializer] })
    @ApiResponse({ status: 404, description: '주차장 정보를 찾을 수 없습니다.' })
    @Get('')
    async get_Parking_Area_Info(
        // @Parking_Area_Infos() parking_area_infos:Parking_Area_Info[]
        @Query('latitude') userLatitude: string,
        @Query('longitude') userLongitude: string,
        @Query('keyword') keyword: string    
    ){
        let GPS_X: number, GPS_Y: number;
        
        // const userLatitude = localStorage.getItem('userLatitude');
        // const userLongitude = localStorage.getItem('userLongitude');
        if(!userLatitude || !userLongitude){
            if (!keyword) {
                return [];
            }
            // const keyword = localStorage.getItem('keyword');
            [GPS_X,GPS_Y]=await this.search(keyword);
        }
        else{
            GPS_X=parseFloat(userLatitude);
            GPS_Y=parseFloat(userLongitude);
        }
        const parking_area_infos = await this.parking_area_info_service.findAll();
        const temp = parking_area_infos.map(parking_area_info => {
            const [longitude, latitude] = parking_area_info.GPS_location.coordinates;
            return {
                temp: this.LoM(longitude, latitude, GPS_X, GPS_Y),
                ...parking_area_info
            };
        });
        temp.sort((a, b) => a.temp - b.temp);
        return temp||false;
    }
    private async search(keyword: string): Promise<[number, number]>{


        // const response = await 네이버 지역검색(keyword);
        // return [response[유저 선택].latitude, response[유저 선택].longitude]  
        return [0,0];
    }
}