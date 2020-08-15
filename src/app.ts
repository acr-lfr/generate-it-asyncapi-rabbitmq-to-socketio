import config from '@/config';
import RabbitMQService from '@/events/rabbitMQ/RabbitMQService';
import ioserver, { Socket } from 'socket.io';
import eventBus from '@/utils/eventBus';
import { EventBusEventsEnum, IEventBusEventRabbitMq } from '@/enums/eventBusEvents';

export default (): Promise<ioserver.Server> => {
  return new Promise((resolve, reject) => {
    Promise.all([
      RabbitMQService.setup(config.rabbitMQ),
    ]).then(() => {

      // Create the SocketIO server (ie what this node is)
      const io = ioserver();

      io.on('connection', (socket: Socket) => {
        console.log('Client connected with id: ' + socket.client.id);
      });

      eventBus.on(EventBusEventsEnum.RabbitMq, (payload: IEventBusEventRabbitMq) => {
        io.emit(payload.operationId, payload.payload);
      });

      return resolve(io);
    }).catch((e) => {
      return reject(e);
    });
  });
}
