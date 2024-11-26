import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
  });
  const port = 9500;
  await app.listen(port);
  console.log('Server rodando na porta: ',port)
}
bootstrap();
