import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/features/user/user.module';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/features/auth/auth.module';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
