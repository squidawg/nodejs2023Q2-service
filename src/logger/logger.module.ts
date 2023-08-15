import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from '../exeption_filter/all_exception.filter';

@Module({
  providers: [
    LoggerService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class LoggerModule {}
