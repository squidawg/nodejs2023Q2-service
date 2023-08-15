import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggerService } from './logger/logger.service';
const PORT = +process.env.PORT || 4000;
console.log(`Server started on http://localhost:${PORT}`);
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });
  const loggingService = app.get(LoggerService);

  process.on('uncaughtException', (error: Error) => {
    loggingService.error(error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: any) => {
    loggingService.error(reason);
  });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, validateCustomDecorators: true }),
  );
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home Library Service API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.listen(PORT);
}
bootstrap();
