import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { randomInt } from "crypto";
import twilio from "twilio";
@Injectable()
export class Twillo_Repository{
    private readonly client: twilio.Twilio
    private readonly fromNumber: string;
    private readonly verificationCodes: Map<string, string> = new Map();

    constructor(private configService: ConfigService){
        
        const accountSid = this.configService.get<string>('TWILLO_ACCOUNT_SID');
        const authToken = this.configService.get<string>('TWILLO_AUTH_TOKEN');
        const fromNumber = this.configService.get<string>('TWILLO_PHONE_NUMBER');

        // 환경 변수들이 모두 정의되어 있는지 확인
        if (!accountSid || !authToken || !fromNumber) {
            throw new InternalServerErrorException('TWILLO_ACCOUNT_SID, TWILLO_AUTH_TOKEN, 또는 TWILLO_PHONE_NUMBER 환경 변수가 설정되지 않았습니다.');
        }
        this.client = twilio(accountSid, authToken);
        this.fromNumber = fromNumber; // 환경 변수에서 읽어온 값 사용
    }

    // 인증 코드 발송 메서드
    async sendVerificationCode(toNumber: string): Promise<string> {
        const verificationCode = this.generateRandomCode();
        
        try {
         await this.client.messages.create({
            body: `인증 번호: ${verificationCode}`,
            from: this.fromNumber,
            to: toNumber,
        });
        this.verificationCodes.set(toNumber, verificationCode);
        // 인증 코드 저장
        return verificationCode;
        } catch (error) {
        throw new Error(`에러 메시지${error}`);
        }
    }

    // 인증 코드 검증
    async verifyCode(toNumber:string, code: string):Promise<boolean>{
        const storedCode = this.verificationCodes.get(toNumber);
        return storedCode ===code;
    }

    // 랜덤 인증 코드 생성
    private generateRandomCode(): string {
        return randomInt(100000, 999999).toString();
    }
}


// const accountSid = '';
// const authToken = '[AuthToken]';
// const client = require('twilio')(accountSid, authToken);

// const randomNumber =randomInt
// client.messages
//     .create({
//         body: randomNumber,
//         from: '+16204458164',

//               to: '+18777804236'
//     })
//     .then(message => console.log(message.sid));