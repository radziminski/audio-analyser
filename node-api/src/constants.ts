import { ConnectionOptions } from 'typeorm';
import * as winston from 'winston';

// General
const isDev = process.env.NODE_ENV === 'development'
export const ENV: 'dev' | 'prod' = isDev ? 'dev' : 'prod';
export const REQUESTS_PER_MINUTE_LIMIT = 300;
export const PASSWORD_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

// AUTH
export const { JWT_SECRET } = process.env;
export const JWT_EXPIRATION_S = `${60 * 60}s`;
export const { ADMIN_EMAIL } = process.env;
export const { ADMIN_PASSWORD } = process.env;

// AWS S3 - ASSETS
export const ASSETS_STORAGE: 'local' | 'external' =
  ENV === 'dev' ? 'local' : 'external';
export const { ASSETS_BASE_URL } = process.env;

export const { AWS_ACCESS_KEY_ID } = process.env;
export const { AWS_SECRET_ACCESS_KEY } = process.env;
export const { AWS_ASSETS_BUCKET_NAME } = process.env;
export const MAX_FILE_SIZE = Math.pow(1024, 2) * 70; // 70 MiB
export const MAX_TOTAL_FILES_SIZE = Math.pow(1024, 3) * 10; // 10 GiB

export const DEMO_FILES_IDS = [4, 5, 6];

// LOCAL ENV
export const { PG_USER } = process.env;
export const { PG_HOST } = process.env;
export const { PG_DATABASE } = process.env;
export const { PG_PASSWORD } = process.env;
export const { PG_PORT } = process.env;
export const { PORT } = process.env;

// DB
export const DB_LOCAL_CONFIG: ConnectionOptions = {
  type: 'postgres',
  host: PG_HOST,
  port: Number(PG_PORT),
  username: PG_USER,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export const DB_PROD_CONFIG: ConnectionOptions = {
  url: process.env.DATABASE_URL,
  type: 'postgres',
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export const DB_CONFIG = isDev ? DB_LOCAL_CONFIG : DB_PROD_CONFIG;

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
export const supportedMimes = ['audio/mpeg', 'audio/wave', 'audio/wav'];
