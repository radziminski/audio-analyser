export const DEVELOPMENT_ENV = 'dev';
export const PRODUCTION_ENV = 'prod';

export const ENV =
  process.env.NODE_ENV === 'production' ? PRODUCTION_ENV : DEVELOPMENT_ENV;

export const APP_TITLE = 'Audio Analyser';
export const API_BASE_URL = 'http://audioanalyser-env.eba-7yyyqsrr.eu-central-1.elasticbeanstalk.com';
