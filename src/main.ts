import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggerService } from './logger/logger.service';
const PORT = +process.env.PORT || 4000;
console.log(`Server started on http://localhost:${PORT}`);
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  const logger = app.get(LoggerService);
  app.useLogger(logger);
  process.on('uncaughtException', (error: Error) => {
    logger.error(error);
  });

  process.on('unhandledRejection', (reason: any) => {
    logger.error(reason);
  });
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home Library Service API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', in: 'header', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.listen(PORT);
}
bootstrap();
