import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Al-90' })
  name: string;
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: 'false' })
  grammy: boolean;
}
