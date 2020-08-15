import dotenv from 'dotenv';
import ConfigHelper from 'openapi-nodegen-config-helper';
import packageJson from '../package.json';

dotenv.config();

/**
 * Add and remove config that you need.
 */
export default {
  // Instance
  env: ConfigHelper.withDefault('ENVIRONMENT', 'production'),
  port: ConfigHelper.withDefault('PORT', 3507),

  // Rabbit MQ
  rabbitMQ: {
    connection: {
      protocol: 'amqp',
      hostname: ConfigHelper.withDefault('RABBITMQ_HOST', 'rabbitmq.url.io'),
      port: ConfigHelper.withDefault('RABBITMQ_PORT', 5672),
      username: ConfigHelper.withDefault('RABBITMQ_USER', 'guest'),
      password: ConfigHelper.withDefault('RABBITMQ_PW', 'guest'),
    },
    queue: ConfigHelper.withDefault('RABBITMQ_QUEUE', `q.${packageJson.name}`),
    dleQueue: ConfigHelper.withDefault('RABBITMQ_DLE_QUEUE', 'q.dle_queue'),
    exchange: ConfigHelper.withDefault('RABBITMQ_EXCHANGE', 'yourapp.exchange'),
    exchangeType: ConfigHelper.withDefault('RABBITMQ_EXCHANGE_TYPE', 'fanout'),
  }
};
