import { ExecutionContext, createParamDecorator } from "@nestjs/common";


export const working_schedules = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) =>{
        const request = ctx.switchToHttp().getRequest();
        return request.working_schedule;
    }
)