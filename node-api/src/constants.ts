import { ConnectionOptions } from 'typeorm';
import * as winston from 'winston';

// General
export const ENV: 'dev' | 'prod' = 'dev';

// AUTH
export const JWT_SECRET_CONFIG_VAR = 'JWT_SECRET';
export const JWT_EXPIRATION_S = '1000s';

// ENV
export const { PG_USER } = process.env;
export const { PG_HOST } = process.env;
export const { PG_DATABASE } = process.env;
export const { PG_PASSWORD } = process.env;
export const { PG_PORT } = process.env;
export const { API_PORT } = process.env;

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
  User: 'user_auth',
  File: 'file',
  Project: 'project',
  ProjectUser: 'project_user',
  ProjectFile: 'project_file',
};

// PROVIDERS
export const PROVIDERS = {
  DatabaseConnection: 'DATABASE_CONNECTION',
};

// LOGS
export const LOGS_DIR = './logs';
export const WINSTON_FILE_LOGGERS: winston.transports.FileTransportOptions[] = [
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

// Audio
export const supportedMimes = ['audio/mpeg', 'audio/wave'];
