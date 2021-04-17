import { WINSTON_FILE_LOGGERS } from './../constants';
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

const { combine, timestamp, printf, errors, colorize, prettyPrint } = format;

const myFormat = printf(({ level, message, _, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

@Module({
  imports: [
    WinstonModule.forRoot({
      format: combine(
        timestamp(),
        errors({ stack: true }),
        colorize(),
        timestamp(),
        prettyPrint(),
        myFormat,
      ),
      transports: [
        ...WINSTON_FILE_LOGGERS.map((config) => new transports.File(config)),
      ],
    }),
  ],
  exports: [WinstonModule],
})
export class LoggerModule {}
