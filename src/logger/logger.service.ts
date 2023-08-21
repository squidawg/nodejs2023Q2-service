import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { LogFileHandlerLogBase } from './logger.filehandler';
import { logger } from './logger.constants';
@Injectable()
export class LoggerService extends ConsoleLogger {
  constructor(private logFileHandlerLog: LogFileHandlerLogBase) {
    super();
  }
  async log(message: any, context?: string) {
    if (!this.isEnabled('log')) {
      return;
    }
    const formattedMessage = this.getFormattedMessage(message, context);
    super.log(formattedMessage);
    await this.logFileHandlerLog.writeFile('log', formattedMessage);
  }
  async warn(message: any, context?: string) {
    if (!this.isEnabled('warn')) {
      return;
    }
    const formattedMessage = this.getFormattedMessage(message, context);
    super.warn(formattedMessage);
    await this.logFileHandlerLog.writeFile('warn', formattedMessage);
  }

  async error(message: any, context?: string) {
    if (!this.isEnabled('error')) {
      return;
    }
    const formattedMessage = this.getFormattedMessage(message, context);
    await this.logFileHandlerLog.writeFile('error', formattedMessage);
    super.error(formattedMessage);
  }

  async debug(message: any, context?: string) {
    if (!this.isEnabled('debug')) {
      return;
    }
    const formattedMessage = this.getFormattedMessage(message, context);
    await this.logFileHandlerLog.writeFile('debug', formattedMessage);
    super.debug(formattedMessage);
  }

  async verbose(message: any, context?: string) {
    if (!this.isEnabled('verbose')) {
      return;
    }
    const formattedMessage = this.getFormattedMessage(message, context);
    await this.logFileHandlerLog.writeFile('verbose', formattedMessage);
    super.verbose(formattedMessage);
  }

  private getFormattedMessage(message: any, context?: string): string {
    return `[${new Date().toISOString()}] [${context || 'App'}] ${message}`;
  }
  isEnabled(loglevel: LogLevel) {
    const level = +process.env.MAX_LOG_LEVEL;
    return logger.slice(0, level).includes(loglevel);
  }
}
