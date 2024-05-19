export const constants = {
  JwtSecret: process.env.JWT_SECRET ?? 'SUPER_ULTRA_MEGA_SECRET',
  RmqUrl: process.env.RABBIT_MQ_URL ?? 'amqp://rmq:rmq@rabbitmq:5672',
};
