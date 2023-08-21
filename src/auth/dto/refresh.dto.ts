import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'string' })
  refreshToken: string;
}
