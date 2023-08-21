import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshDto } from './dto/refresh.dto';
import {
  ApiLoginAuth,
  ApiPost,
  ApiRefreshAuth,
  Public,
} from '../utils/decorator.service';
import { ApiTags } from '@nestjs/swagger';
import { UserData } from '../users/model/users.model';
import { AccessDto } from './dto/access.dto';
@ApiTags('Auth Api')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiPost(UserData)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Public()
  @Post('/signup')
  async signup(@Body() content: AuthDto) {
    return await this.authService.signUp(content);
  }
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiLoginAuth(AccessDto)
  @Public()
  @Post('/login')
  async signin(@Body() content: AuthDto) {
    const user = await this.authService.validate(content);
    return await this.authService.login(user);
  }
  @UsePipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNAUTHORIZED,
    }),
  )
  @ApiRefreshAuth(AccessDto)
  @Public()
  @Post('/refresh')
  async refresh(@Body() content: RefreshDto) {
    const token = await this.authService.checkToken(content);
    return await this.authService.login(token);
  }
}
