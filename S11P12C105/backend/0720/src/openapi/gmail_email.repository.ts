import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { randomInt } from 'crypto';


// 이메일 인증
@Injectable()
export class GmailEmailRepository {
  private readonly transporter;
  private readonly verificationCodes: Map<string, string> = new Map();

  constructor(private configService: ConfigService) {
    // Nodemailer를 사용하여 Gmail SMTP 서버와 연결
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASSWORD'),
      },
    });
  }
  // 인증 이메일 발송
  async sendVerificationEmail(to: string): Promise<string> {
    const verificationCode = this.generateRandomCode();
    const subject = '인증 번호 메일';
    const body = `인증 번호 ${verificationCode}`;


    try {
        // 이메일 전송
        await this.transporter.sendMail({
          from: this.configService.get<string>('GMAIL_USER'),
          to,
          subject,
          text: body,
        });
  
        // 인증 코드 저장
        this.verificationCodes.set(to, verificationCode);
        return verificationCode;
      } catch (error) {
        throw new Error(`이메일 전송 에러 : ${error}`);
      }
  }
  // 인증 코드 검증 
  async verifyCode(to: string, code: string): Promise<boolean> {
    const storedCode = this.verificationCodes.get(to);
    return storedCode === code;
  }

  // 랜덤 인증 코드 생성 
  private generateRandomCode(): string {
    return randomInt(100000, 999999).toString();
  }
}
