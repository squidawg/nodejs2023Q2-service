import { appendFile, mkdir, readdir } from 'fs/promises';
import * as fs from 'fs/promises';
import { Injectable } from '@nestjs/common';
import * as os from 'os';
@Injectable()
export class LogFileHandlerLogBase {
  logFilePath: string = '';
  private MAX_FILE_SIZE_KB = +process.env.MAX_FILE_SIZE_KB;
  async writeFile(fileName: string, message: string) {
    if (this.logFilePath === '') {
      this.logFilePath =
        process.cwd() +
        `/${process.env.PATH_LOGS}/_${new Date().toISOString()}`;
    }
    try {
      await readdir(this.logFilePath);
    } catch (e) {
      await mkdir(this.logFilePath, { recursive: true });
    }

    const line = message + os.EOL;
    const source = `${this.logFilePath}/${fileName}.log`;
    await appendFile(source, line);
    const stat = await fs.stat(`${source}`);
    if (stat.size > this.MAX_FILE_SIZE_KB * 10) {
      this.logFilePath = '';
    }
  }
}
