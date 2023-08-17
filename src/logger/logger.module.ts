import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from '../exeption_filter/all_exception.filter';
import { LogFileHandlerLogBase } from './logger.filehandler';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  providers: [
    LoggerService,
    LogFileHandlerLogBase,
    LoggerMiddleware,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
