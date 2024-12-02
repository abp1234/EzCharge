import { ExecutionContext, createParamDecorator } from "@nestjs/common";



export const Robot_Infos = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) =>{
        const request = ctx.switchToHttp().getRequest();
        return request.robot_infos;
    }
)