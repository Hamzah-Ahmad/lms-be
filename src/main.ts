import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: "http://localhost:5173"
  });


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,         
    forbidNonWhitelisted: true, 
    transform: true,   
  }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();