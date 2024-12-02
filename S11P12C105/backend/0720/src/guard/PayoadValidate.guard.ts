// 유효성 검사 가드
import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';

@Injectable()
export class PayloadValidationGuard implements CanActivate {
  
  // 요청이 유효한지 확인
  canActivate(context: ExecutionContext): boolean {
    // context에서 http 요청 객체 
    const request = context.switchToHttp().getRequest();
    // 요청 본문
    const body = request.body;

    // 본문이 존재, requiredField라는 필드 존재 확인
    if (body && body.requiredField) {
      return true;
    }

    // 없다면 오류 알림
    throw new BadRequestException('Invalid payload.');
  }
}
