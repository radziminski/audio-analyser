import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { API_PORT } from './constants';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'files/audio'));
  app.use(helmet());
  app.enableCors();

  await app.listen(API_PORT);
  console.log(`Listening on port ${API_PORT}...`);
}

void bootstrap();
