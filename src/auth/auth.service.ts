import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { RefreshDto } from './dto/refresh.dto';
import { UsersEntity } from '../users/entities/users.entity';
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

  async login(user: UsersEntity) {
    const payload = { userId: user.id, login: user.login };
    return {
      accessToken: await this.signAccessToken(payload),
      refreshToken: await this.signRefreshToken(payload),
    };
  }
  async validate(content: AuthDto) {
    const user = await this.userService.findByLogin(content.login);
    if (!user) {
      throw new ForbiddenException('no user with such login');
    }
    const isCompared = bcrypt.compareSync(content.password, user.password);
    if (!isCompared) {
      throw new ForbiddenException('no user with such password');
    }
    return user ?? null;
  }
  checkToken(refreshDto: RefreshDto) {
    if (!refreshDto) {
      throw new ForbiddenException();
    }
    const token = this.jwtService.verify(refreshDto.refreshToken, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });
    if (!token) {
      throw new ForbiddenException();
    }
    return token;
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
