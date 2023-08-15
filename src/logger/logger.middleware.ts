import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, body, query } = req;
    const userAgent = req.get('user-agent') || '';
    const { statusCode } = res;
    const contentLength = res.get('content-length');

    res.on('finish', () => {
      const logMsg = `${method} ${originalUrl} ${JSON.stringify(
        query,
      )} ${JSON.stringify(
        body,
      )} ${statusCode} ${contentLength} - ${userAgent} ${ip}`;
      if (res.statusCode >= 500) {
        this.logger.error(logMsg);
      }
      if (res.statusCode >= 400 && statusCode < 500) {
        this.logger.warn(logMsg);
      } else {
        this.logger.log(logMsg);
      }
    });
    next();
  }
}
