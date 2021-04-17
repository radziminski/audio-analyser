import { DB_CONFIG } from './../constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forRoot(DB_CONFIG)],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
