import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './utils/decorator.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Public()
  @ApiExcludeEndpoint()
  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }
}
