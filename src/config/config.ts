import * as dotenv from 'dotenv';
dotenv.config();
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { DataSourceOptions } from 'typeorm';

const serverConfig = {
  port: process.env.APP_ENV === 'development' ? process.env.SERVER_PORT : 8080,
};

const mysqlDatabaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'nest_dev',
  synchronize: true,
};

const databaseConfig = process.env.DATABASE_TYPE === 'mysql' ? mysqlDatabaseConfig : null;

const openApiConfig = {
  title: process.env.API_TITLE || 'Test API',
  description: process.env.API_DESCRIPTION || 'Test API',
  version: process.env.API_DOCS_VERSION || '1.0',
};

const openApiAuthConfig: SecuritySchemeObject = {
  type: process.env.API_AUTH_TYPE === 'http' ? 'http' : '' || 'http',
  scheme: process.env.API_AUTH_BEARER_SCHEME || 'Bearer',
  bearerFormat: process.env.API_AUTH_BEARER_FORMAT || 'JWT',
  description: process.env.API_AUTH_DESCRIPTION || 'Test API',
  name: process.env.API_AUTH_NAME || 'Authorization',
  in: process.env.API_AUTH_IN || 'header',
};

export { serverConfig, databaseConfig, openApiConfig, openApiAuthConfig };
