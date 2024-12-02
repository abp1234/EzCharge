import { Module } from '@nestjs/common';
import { GmailEmailRepository } from '../openapi/gmail_email.repository';

@Module({
  providers: [GmailEmailRepository],
  exports: [GmailEmailRepository],
})
export class GmailEmailModule {}
