//요청의 특정 헤더 값을 검증하여 요청을 허용 또는 거부
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class HeaderValidationGuard implements CanActivate {
  // canActivate 메서드는 요청이 특정 헤더 값을 포함하는지 확인
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const customHeader = request.headers['x-custom-header'];

    // 'x-custom-header' 값이 'expected-value'인 경우 요청을 허용
    if (customHeader === 'expected-value') {
      return true; // 요청을 허용
    }
    // 'x-custom-header' 값이 'expected-value'가 아닌 경우 예외
    throw new ForbiddenException('Invalid header.');// 요청을 거부
  }
}
