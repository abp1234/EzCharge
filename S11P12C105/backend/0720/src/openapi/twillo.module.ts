import { Module } from '@nestjs/common';
import { Twillo_Repository } from '../openapi/twillo.repository';

@Module({
  providers: [Twillo_Repository],
  exports: [Twillo_Repository],
})
export class TwilloModule {}
