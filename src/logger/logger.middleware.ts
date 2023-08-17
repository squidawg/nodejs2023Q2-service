import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, body, query } = req;
    const userAgent = req.get('user-agent') || '';
    const { statusCode } = res;
    const contentLength = res.get('content-length') || '';

    res.on('finish', async () => {
      const logMsg = `${method} ${originalUrl} ${JSON.stringify(
        query,
      )} ${JSON.stringify(
        body,
      )} ${statusCode} ${contentLength} - ${userAgent} ${ip}`;
      if (res.statusCode >= 500) {
        await this.loggerService.error(logMsg);
      }
      if (res.statusCode >= 400 && statusCode < 500) {
        await this.loggerService.warn(logMsg);
      } else {
        await this.loggerService.log(logMsg);
      }
    });
    next();
  }
}
