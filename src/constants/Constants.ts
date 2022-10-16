const Constants = {
  // Common
  EMPTY_STRING: '',
  EMPTY_DATA: 0,
  DEFAULT_DATE: '01/01/1970',

  // API
  APPLICATION_DEV_ENV: 'development',
  APPLICATION_PROD_ENV: 'production',
  SERVER_DEFAULT_HOSTNAME: 'localhost',
  SERVER_DEFAULT_PORT: 8000,
  DATABASE_DEFAULT_HOST: 'localhost',
  DATABASE_DEFAULT_PORT: 3306,
  DATABASE_DEFAULT_NAME: 'database',
  DATABASE_DEFAULT_TYPE: 'mysql',
  DATABASE_DEFAULT_USER: 'root',
  DATABASE_DEFAULT_PASSWORD: '',
  API_VERSION: 'v1',
  DEFAULT_CROSS_ORIGIN: '*',
  VALIDATION_FIELDS_ERROR: "Invalid body, check 'payload' property for more info",

  // API DOCS
  API_DOCS_TITLE: 'Rest API',
  API_DOCS_DESCRIPTION: 'restful api with express and typescript',
  API_CONTACT_NAME: 'Makhlouf Helali',
  API_CONTACT_URL: 'https://maklouf-helali.com',
  API_CONTACT_EMAIL: 'makhlouf.hleli@gmail.com',

  // password validation
  PASSWORD_MIN_LENGTH: 6,

  // JWT
  DEFAULT_JWT_ACCESS_PRIVATE_KEY: 'privateAccessKey',
  DEFAULT_JWT_ACCESS_PUBLIC_KEY: 'publicAccessKey',
  DEFAULT_JWT_REFRESH_PRIVATE_KEY: 'privateRefreshKey',
  DEFAULT_JWT_REFRESH_PUBLIC_KEY: 'publicrefreshKey',
  JWT_DEFAULT_ACCESS_TOKEN_TIME_TO_LEAVE: '1h',
  JWT_DEFAULT_REFRESH_TOKEN_TIME_TO_LEAVE: '1d',
};
const PASSWORD_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

export { Constants, PASSWORD_REGEX };