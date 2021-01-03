import config from '@/config';
import RabbitMQService from '@/rabbitMQ/RabbitMQService';
import { Server, Socket } from 'socket.io';
import eventBus from '@/utils/eventBus';
import { EventBusEventsEnum, IEventBusEventRabbitMq } from '@/enums/eventBusEvents';

export default async (): Promise<Server> => {
  await RabbitMQService.setup(config.rabbitMQ);

  // Create the SocketIO server (ie what this node is)
  const io = new Server();

  io.on('connection', (socket: Socket) => {
    console.log('Client connected to the director with id: ' + socket.id);
  });

  eventBus.on(EventBusEventsEnum.RabbitMq, (payload: IEventBusEventRabbitMq) => {
    io.emit(payload.operationId, payload.payload);
  });

  return io;
}
