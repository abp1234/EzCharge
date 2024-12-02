import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MqttService } from './mqtt/mqtt.service';
@Controller()
export class AppController {
  constructor(private readonly mqttService:MqttService,
private readonly appService: AppService) {}
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('publish')
  publishMessage(): string{
    this.mqttService.publish('robot/status','ON');
    return '로봇(MQTT)로부터 메시지를 받았습니다.'
  }
}
