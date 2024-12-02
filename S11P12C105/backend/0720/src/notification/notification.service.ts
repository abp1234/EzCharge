import { Injectable } from '@nestjs/common';
import { firebaseAdmin } from '../config/firebase.config';
import { messaging } from 'firebase-admin';

@Injectable()
export class NotificationService {

  async sendNotification(
    token: string,
    title: string,
    body: string,
  ): Promise<void> {
    const message: messaging.Message = {
      notification: {
        title: title,
        body: body,
      },
      token: token,
    };

    try {
      await firebaseAdmin.messaging().send(message);
    } catch (error) {
      console.error('알림 전송 오류', error);
    }
  }
}
