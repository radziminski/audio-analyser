import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from 'winston';

import { logObject } from '../../logger/utils';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  use(req: Request, _: Response, next: NextFunction) {
    this.logger.http(
      '==================================================================================',
    );
    this.logger.http('Received Request');
    req.headers && logObject(this.logger, 'Headers', req.headers);
    this.logger.http(`==> Url: ${req.url}`);
    req.query && logObject(this.logger, 'Query', req.query);
    req.body && logObject(this.logger, 'Body', req.body);
    req.params && logObject(this.logger, 'Params', req.params);
    req.cookies && logObject(this.logger, 'Params', req.cookies);

    this.logger.http(
      '==================================================================================',
    );

    // DELETE THIS!!! TODO:
    //if (Math.random() > 0.8) throw new InternalServerErrorException();

    setTimeout(() => next(), 1000);
  }
}
