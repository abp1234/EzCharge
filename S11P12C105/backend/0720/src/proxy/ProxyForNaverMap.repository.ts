import { HttpService } from "@nestjs/axios";
import { Controller, Get, Query } from "@nestjs/common";
import { ConfigService} from '@nestjs/config'
import { map } from "rxjs";


// @Controller('map')
// export class MapController {
//     private readonly NAVER_CLIENT_ID:string;
//     constructor(
//         private readonly httpService: HttpService,
//         private readonly configService: ConfigService,
//     ){
//         this.NAVER_CLIENT_ID=this.configService.get<string>('NAVER_CLIENT_ID');
//     }

//     @Get('data')
//     getMapData(@Query('location') location:string){
//         const url = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${this.NAVER_CLIENT_ID}&location=${location}`
//         return this.httpService.get(url).pipe(map(response => response.data));
//     }
// }