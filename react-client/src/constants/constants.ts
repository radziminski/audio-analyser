export const DEVELOPMENT_ENV = 'dev';
export const PRODUCTION_ENV = 'prod';

export const ENV =
  process.env.NODE_ENV === 'production' ? PRODUCTION_ENV : DEVELOPMENT_ENV;

export const APP_TITLE = 'Audio Analyser';
export const API_BASE_URL = process.env.API_URL;

export const MIN_SCREEN_WIDTH = 1100;