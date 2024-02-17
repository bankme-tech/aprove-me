import * as winston from 'winston';

const Logger = () => {
  const logger = winston
    .createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'Aprove-me', source: 'production' },
    })
    .add(
      new winston.transports.Console({
        format: winston.format.json(),
      }),
    );

  return {
    info: (message: any) => logger.info(message),
    error: (message: any) => logger.error(message),
    warn: (message: any) => logger.warn(message),
  };
};

export default Logger();
