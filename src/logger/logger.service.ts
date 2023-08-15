import { ConsoleLogger, Injectable } from '@nestjs/common';
import {
  LogFileHandlerError,
  LogFileHandlerLogBase,
  LogFileHandlerWarn,
} from './logger.filehandler';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private logFileHandlerLog = new LogFileHandlerLogBase();
  private logFileHandlerWarn = new LogFileHandlerWarn();
  private logFileHandlerError = new LogFileHandlerError();

  async log(message: any, context?: string) {
    const formattedMessage = this.getFormattedMessage(message, context);
    super.log(formattedMessage, context);
    await this.logFileHandlerLog.log('log', formattedMessage);
  }

  async warn(message: any, context?: string) {
    const formattedMessage = this.getFormattedMessage(message, context);
    super.warn(formattedMessage, context);
    await this.logFileHandlerWarn.warn(formattedMessage);
  }

  async error(message: any, trace?: string, context?: string) {
    const formattedMessage = this.getFormattedMessage(message, context);
    super.error(formattedMessage, trace, context);
    await this.logFileHandlerError.error(formattedMessage);
  }

  private getFormattedMessage(message: any, context?: string): string {
    return `[${new Date().toISOString()}] [${context || 'App'}] ${message}`;
  }
}
