import { logObject } from './../../logger/utils';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from 'winston';

@Injectable()
export class ResponseLoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  use(_: Request, res: Response, next: NextFunction) {
    this.logger.http('Sent Response');
    res.getHeaders() && logObject(this.logger, 'Headers', res.getHeaders());

    next();
  }
}
