import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // autorise les requêtes du frontend
  await app.listen(3000);
}
bootstrap();
