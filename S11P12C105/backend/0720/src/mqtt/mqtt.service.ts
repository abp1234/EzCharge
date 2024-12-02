import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Robot_Info } from '../entities/robot.entity'; 
import { connect, MqttClient } from 'mqtt';
import { Client } from '@nestjs/microservices';
// import { Device } from 'aws-iot-device-sdk';
// import { truncate } from 'fs';

@Injectable()
export class MqttService {
  private readonly logger = new Logger(MqttService.name);
  private mqttClient: MqttClient;
  // private mqttClient: Device;

  constructor(
    @InjectRepository(Robot_Info)
    private robotRepository: Repository<Robot_Info>,
  ) {
    this.mqttClient = connect('mqtt://172-26-8-182:1883');
    // this.mqttClient = connect('mqtt://localhost:1883');
    // this.mqttClient = new Device({
    //   keyPath: 'path/to/private-key.pem.key',
    //   certPath: 'path/to/certificate.pem.crt',
    //   caPath: 'path/to/Amazon-root-CA-1.pem',
    //   clientId: 'your-client-id',
    //   host: 'your-endpoint.iot.region.amazonaws.com'
    // });
    this.connect();
  }

  connect(): void {
    this.mqttClient.on('connect', () => {
      // this.logger.log('MQTT 브로커에 연결되었습니다.');
      // 토픽을 구독
      this.logger.log('AWS IoT에 연결되었습니다.');
      this.mqttClient.subscribe('Rapi5/get');
      // this.mqttClient.subscribe('room/get/switch');
    });

    this.mqttClient.on('error', (error: Error) => {
      this.logger.error(`MQTT 클라이언트 에러: ${error.message}`);
    });

    this.mqttClient.on('message', async (topic: string, message: Buffer) => {
      const payload = message.toString();
      const robot = new Robot_Info();
      if(payload==='충전 끝'){
        robot.State = true;
      }
      else{
        robot.State = false;
      }
      //robot.timestamp = new Date();

      try {
        await this.robotRepository.save(robot);
        this.logger.log(`데이터베이스에 저장된 데이터: ${JSON.stringify(robot)}`);
      } catch (error) {
        this.logger.error(`데이터베이스 저장 중 에러 발생: ${error}`);
      }
    });
  }

  publish(topic: string, message: string): void {
    this.mqttClient.publish(topic, message, {}, (error: Error|undefined) => {
      if (error) {
        this.logger.error(`메시지 전송 실패: ${error.message}`);
      } else {
        this.logger.log(`토픽 ${topic}에 메시지를 전송했습니다.`);
      }
    });
  }

  subscribe(topic: string): void {
    this.mqttClient.subscribe(topic, {}, (error: Error|null) => {
      if (error) {
        this.logger.error(`토픽 구독 실패: ${error.message}`);
      } else {
        this.logger.log(`토픽 ${topic}을 구독했습니다.`);
      }
    });
  }
}
