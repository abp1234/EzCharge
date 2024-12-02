import { ExecutionContext, createParamDecorator } from "@nestjs/common";


export const Parking_Coordinate_Infos = createParamDecorator(
    (data: unknown, ctx: ExecutionContext)=>{
        const request = ctx.switchToHttp().getRequest();
        return request.parking_coordinate;
    }
)