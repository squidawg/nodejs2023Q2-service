import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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
  @Expose()
  @ApiProperty({ example: 'uuid' })
  id: string;
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({ example: 'MusicListener' })
  login: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({ example: 'timestamp' })
  createdAt: number;
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({ example: 'timestamp' })
  updatedAt: number;
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({ example: 'number' })
  version: number;
}
