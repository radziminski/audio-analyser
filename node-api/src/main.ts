import { API_PORT } from './constants';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(API_PORT);
  console.log(`Listening on port ${API_PORT}...`);
}
bootstrap();
