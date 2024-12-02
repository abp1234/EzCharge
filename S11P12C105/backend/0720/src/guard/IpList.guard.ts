import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
// IpWhitelistGuard는 특정 IP 주소만 접근을 허용하는 가드
@Injectable()
export class IpWhitelistGuard implements CanActivate {
  // 허용된 IP 주소 목록을 정의
  private readonly allowedIps: string[] = ['123.456.789.0'];

  // canActivate 메서드는 요청이 허용된 IP 주소에서 오는지 확인
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const clientIp = request.ip;
    // 클라이언트의 IP 주소
    if (this.allowedIps.includes(clientIp)) {
      return true;// 요청을 허용
    }
    // 허용되지 않은 IP인 경우 알림
    throw new ForbiddenException('Access denied from this IP address.');
  }
}
