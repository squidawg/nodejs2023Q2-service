import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private httpAdapterHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = 'Internal Server Error';
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorMessage = exception.message;
    }
    const { httpAdapter } = this.httpAdapterHost;
    const body = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      messsage: errorMessage,
    };
    httpAdapter.reply(ctx.getResponse(), body, status);
  }
}
