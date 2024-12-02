import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import {JwtService} from '@nestjs/jwt'


@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService){}
    canActivate(context: ExecutionContext): boolean{
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token){
            throw new UnauthorizedException('토큰이 없네')
        }
        try{
            const decoded = this.jwtService.verify(token);
            request.user = decoded;
            return true;
        } catch (error){
            throw new UnauthorizedException('유효하지 않은 토큰이네')
        }
    }
}