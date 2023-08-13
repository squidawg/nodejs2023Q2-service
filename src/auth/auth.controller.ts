import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshDto } from './dto/refresh.dto';
import { Public } from '../utils/decorator.service';
@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async signup(@Body() content: AuthDto) {
    return await this.authService.signUp(content);
  }
  @Post('/login')
  async signin(@Body() content: AuthDto) {
    const user = await this.authService.validate(content);
    return await this.authService.login(user);
  }
  @Post('/refresh')
  async refresh(@Body() content: RefreshDto) {
    const token = this.authService.checkToken(content);
    return await this.authService.login(token);
  }
}
