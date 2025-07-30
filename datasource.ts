import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.getOrThrow('DB_HOST'),
  port: +configService.getOrThrow('DB_PORT'),
  username: configService.getOrThrow('DB_USERNAME'),
  password: configService.getOrThrow('DB_PASSWORD'),
  database: configService.getOrThrow('DB_NAME'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  migrationsRun: false,
  synchronize: false,
  logging: process.env.ENV !== 'production',
};


const dataSource = new DataSource(dataSourceOptions);

export default dataSource;


// Migration guide here: https://javascript.plainenglish.io/nestjs-typeorm-migrations-in-2025-50214275ec8d
