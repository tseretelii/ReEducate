import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ExpressLoaderMiddleware } from './middleware/express.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Simple middleware that demonstrates request mutation.
  app.use(new ExpressLoaderMiddleware().use);

  await app.listen(3000);
}

bootstrap();

