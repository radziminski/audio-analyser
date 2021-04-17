import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [DatabaseModule, LoggerModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
