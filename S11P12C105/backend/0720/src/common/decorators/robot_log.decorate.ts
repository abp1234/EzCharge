import { ExecutionContext, createParamDecorator } from "@nestjs/common";


export const Robot_Logs = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.Robot_Logs;
    },
)