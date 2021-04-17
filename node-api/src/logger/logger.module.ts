import { WINSTON_FILE_LOGGERS } from './../constants';
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        ...WINSTON_FILE_LOGGERS.map(
          (config) => new winston.transports.File(config),
        ),
      ],
    }),
  ],
  exports: [WinstonModule],
})
export class LoggerModule {}
