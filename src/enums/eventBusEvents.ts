export enum EventBusEventsEnum {
  RabbitMq = 'rabbitMq'
}

export interface IEventBusEventRabbitMq {
  operationId: string,
  payload: any
}
