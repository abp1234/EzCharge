import { ExecutionContext, createParamDecorator } from "@nestjs/common";


export const Cars = createParamDecorator(
    (data:unknown, ctx:ExecutionContext)=>{
        const request = ctx.switchToHttp().getRequest();
        return request.car;
    }
)