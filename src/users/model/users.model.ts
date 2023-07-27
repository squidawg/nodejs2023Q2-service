import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export class CreatedUser implements Partial<User> {
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
}
export class UserResponse implements Partial<User> {
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
