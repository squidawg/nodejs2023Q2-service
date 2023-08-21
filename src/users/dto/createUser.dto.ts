import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'MusicListener' })
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'myPassword' })
  password: string;
}
