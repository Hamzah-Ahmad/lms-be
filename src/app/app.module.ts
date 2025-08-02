import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/features/users/users.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
