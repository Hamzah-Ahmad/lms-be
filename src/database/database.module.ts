// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  ConfigService } from '@nestjs/config';
import dataSource, { dataSourceOptions } from 'datasource';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.getOrThrow("DB_HOST"),
    //     port: +configService.getOrThrow("DB_PORT"),
    //     username: configService.getOrThrow("DB_USERNAME"),
    //     password: configService.getOrThrow("DB_PASSWORD"),
    //     database: configService.getOrThrow("DB_NAME"),
    //     autoLoadEntities: true,
    //     synchronize: configService.get<string>('TYPEORM_SYNC', 'false') === 'true', // use false in prod
    //   }),
    //   inject: [ConfigService]
    // }),
    TypeOrmModule.forRoot(dataSourceOptions),

  ],
})
export class DatabaseModule {}
