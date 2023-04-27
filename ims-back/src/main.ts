import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as config from 'config'
const serverConfig=config.get('server')
const port=serverConfig.port
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true});
  app.useGlobalPipes(new ValidationPipe({
    //setting up gloabal valudation pipe
    whitelist:true//only allow that propertis that are requird in body or mentioned in dto
  }))
  await app.listen(port);
}
bootstrap();
