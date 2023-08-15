import * as fs from 'fs/promises';
import { appendFile, mkdir, readdir } from 'fs/promises';
const MAX_FILE_SIZE_KB = +process.env.MAX_FILE_SIZE_KB;
let currentLogSize = 0;

export class LogFileHandlerLogBase {
  protected logFilePath: string;

  async log(fileName: string, message: string) {
    this.logFilePath = process.cwd() + `/dist/src/logs/${fileName}.log`;
    try {
      await readdir(this.logFilePath);
    } catch (e) {
      await mkdir(this.logFilePath, { recursive: true });
    }
    const source = `${this.logFilePath}/${fileName}.log`;

    const line = message + '\r\n';
    await appendFile(source, line);
    currentLogSize += message.length;

    if (currentLogSize > MAX_FILE_SIZE_KB * 1024) {
      await this.rotateLogFile();
    }
  }

  protected async rotateLogFile() {
    const backupFilePath = `/Users/zhenyaprivet/Desktop/nodejs2023Q2-service/src/logs/${this.logFilePath.replace(
      '.log',
      '',
    )}_${new Date().toISOString()}.log`;
    await fs.rename(this.logFilePath, backupFilePath);
    currentLogSize = 0;
  }
}

export class LogFileHandlerWarn extends LogFileHandlerLogBase {
  async warn(message: string) {
    await super.log('warn', message);
  }
}

export class LogFileHandlerError extends LogFileHandlerLogBase {
  async error(message: string) {
    await super.log('error', message);
  }
}
