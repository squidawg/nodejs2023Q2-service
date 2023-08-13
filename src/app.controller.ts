import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './utils/decorator.service';
@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  getHello(): string {
    return this.appService.getHello();
  }
}
