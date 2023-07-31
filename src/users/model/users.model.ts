import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';

export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export class CreateUserReq implements Partial<User> {
  @IsString()
  @IsNotEmpty()
  login: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
export class UserData implements User {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'uuid' })
  id: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'MusicListener' })
  login: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'MyPassword' })
  password: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 'timestamp' })
  createdAt: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 'timestamp' })
  updatedAt: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 'number' })
  version: number;
  constructor(login: string, password: string) {
    const timestampOfCreation = Date.now();
    this.id = v4();
    this.login = login;
    this.password = password;
    this.createdAt = timestampOfCreation;
    this.updatedAt = timestampOfCreation;
    this.version = 1;
  }
}
export class CreateUserRes implements Partial<User> {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'uuid' })
  id: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'MusicListener' })
  login: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 'timestamp' })
  createdAt: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 'timestamp' })
  updatedAt: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 'number' })
  version: number;
}
