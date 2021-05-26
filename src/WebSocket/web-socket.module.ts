import { Module } from '@nestjs/common';
import { EventsGateway } from './web-socket.controller';

@Module({
  providers: [EventsGateway],
})
export class EventsModule {}
