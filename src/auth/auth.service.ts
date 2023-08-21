import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { RefreshDto } from './dto/refresh.dto';
import { UsersEntity } from '../users/entities/users.entity';
import { AccessDto } from './dto/access.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signUp(content: AuthDto) {
    const hash = bcrypt.hashSync(content.password, +process.env.CRYPT_SALT);
    return await this.userService.create({
      login: content.login,
      password: hash,
    });
  }

  async login(user: UsersEntity): Promise<AccessDto> {
    const payload = { id: user.id, login: user.login };
    return {
      accessToken: await this.signAccessToken(payload),
      refreshToken: await this.signRefreshToken(payload),
    };
  }
  async validate(content: AuthDto) {
    try {
      const user = await this.userService.findByLogin(content.login);
      const isCompared = await bcrypt.compare(content.password, user.password);
      if (!isCompared) {
        throw new ForbiddenException(
          "no user with such login or password doesn't match actual one",
        );
      }
      return user;
    } catch (e) {
      throw new ForbiddenException(
        "no user with such login or password doesn't match actual one",
      );
    }
  }
  async checkToken(refreshDto: RefreshDto) {
    try {
      const refreshToken = await this.jwtService.verifyAsync(
        refreshDto.refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        },
      );
      return refreshToken;
    } catch (e) {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }
  }
  private async signAccessToken(payload: JwtPayload) {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
  }

  private async signRefreshToken(payload: JwtPayload) {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
  }
}
