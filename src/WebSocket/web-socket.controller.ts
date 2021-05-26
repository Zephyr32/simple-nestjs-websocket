import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HttpService, Logger } from '@nestjs/common';
import { FxRatesService } from '../services/fx-rates.service';

@WebSocketGateway(3001)
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  fxRatesService: FxRatesService = new FxRatesService();

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('getFeed')
  hello(@ConnectedSocket() client: Socket): void {
    this.fxRatesService.getFeed().subscribe((res) => {
      client.send(JSON.stringify({ event: 'getFeed', data: res }));
    });
  }

  afterInit(server: any): any {
    this.logger.log('Init');
  }

  handleConnection(client: any, ...args: any[]): any {
    console.log('handleConnect');
  }

  handleDisconnect(client: any): any {
    console.log('handleDisconnect');
  }
}
