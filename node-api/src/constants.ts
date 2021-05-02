import { ConnectionOptions } from 'typeorm';
import * as winston from 'winston';

console.log(process.env);
// General
// export const ENV: 'dev' | 'prod' =
//   process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
export const ENV = 'prod';
export const ASSETS_BASE_URL_CONFIG_VAR = 'ASSETS_BASE_URL';

// AUTH
export const JWT_SECRET_CONFIG_VAR = 'JWT_SECRET';
export const JWT_EXPIRATION_S = '1000s';

export const { AWS_ACCESS_KEY_ID } = process.env;
export const { AWS_SECRET_ACCESS_KEY } = process.env;
export const { AWS_S3_BUCKET_NAME } = process.env;

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
