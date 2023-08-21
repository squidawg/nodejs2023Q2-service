import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
