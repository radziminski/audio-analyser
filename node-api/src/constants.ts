import { ConnectionOptions } from 'typeorm';
import * as winston from 'winston';

// ENV
export const PG_USER = process.env.PG_USER;
export const PG_HOST = process.env.PG_HOST;
export const PG_DATABASE = process.env.PG_DATABASE;
export const PG_PASSWORD = process.env.PG_PASSWORD;
export const PG_PORT = process.env.PG_PORT;
export const API_PORT = process.env.API_PORT;

// DB
export const DB_CONFIG: ConnectionOptions = {
  type: 'postgres',
  host: PG_HOST,
  port: Number(PG_PORT),
  username: PG_USER,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
export const DB_TABLES = {
  UserProfile: 'user_profile',
};

// PROVIDERS
export const PROVIDERS = {
  DatabaseConnection: 'DATABASE_CONNECTION',
};

// LOGS
export const LOGS_DIR = './logs';
export const WINSTON_FILE_LOGGERS: Array<winston.transports.FileTransportOptions> = [
  {
    filename: 'errors.log',
    level: 'warn',
    dirname: LOGS_DIR,
  },
  {
    filename: 'combined.log',
    level: 'silly',
    dirname: LOGS_DIR,
  },
  {
    filename: 'http.log',
    level: 'http',
    dirname: LOGS_DIR,
  },
];
