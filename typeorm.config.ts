import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';

dotenv.config();
export const dbConfig = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  autoLoadEntities: true,
  migrationsTableName: 'table',
};

export default registerAs('typeorm', () => dbConfig);
export const connectionSource = new DataSource(dbConfig as DataSourceOptions);
