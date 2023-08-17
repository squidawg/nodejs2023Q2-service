import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'MusicListener' })
  login: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'mySecretPassword' })
  password: string;
}

export class AccessDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'string' })
  accessToken: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'string' })
  refreshToken: string;
}
