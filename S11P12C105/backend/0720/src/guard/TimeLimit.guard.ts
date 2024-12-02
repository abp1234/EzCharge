import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// ExecutionContext - 요청의 실행 컨텍스트
import {RateLimiterMemory} from 'rate-limiter-flexible'// 메모리기반, 주어진 시간 동안 특정 요청 수 제한



@Injectable()
export class RateLimitGuard implements CanActivate{
    private rateLimiter = new RateLimiterMemory({
        points: 10, // 최대 허용 요청 수
        duration: 60, // 요청 수를 제한할 기간(초)
    });
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const key=request.ip;
        // 요청의 IP 확인
        try{
            // rateLimiter.consume 메서드를 호출하여 요청을 소비
            // 요청이 허용되면 남은 포인트 수를 반환
            await this.rateLimiter.consume(key);
            return true; // 요청 허용
        }catch(rateLimiterRes){
            // 요청이 허용된 최대 횟수를 초과
            return false; // 요청 거절
        }
        
    }
}