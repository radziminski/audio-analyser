import { ConnectionOptions } from 'typeorm';
import * as winston from 'winston';

// General
export const ENV: 'dev' | 'prod' =
  process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
export const REQUESTS_PER_MINUTE_LIMIT = 15;

// AUTH
export const JWT_SECRET_CONFIG_VAR = 'JWT_SECRET';
export const JWT_EXPIRATION_S = '1000s';

// AWS S3 - ASSETS
export const { AWS_ACCESS_KEY_ID } = process.env;
export const { AWS_SECRET_ACCESS_KEY } = process.env;
export const { AWS_S3_BUCKET_NAME } = process.env;
export const MAX_FILE_SIZE = Math.pow(1024, 2) * 70; // 70 MiB
export const MAX_TOTAL_FILES_SIZE = Math.pow(1024, 3) * 10; // 10 GiB

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
  synchronize: true,
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
