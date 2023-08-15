import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Code-915913' })
  name: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: '2015' })
  year: number;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'uuid', description: 'optional property' })
  artistId: string | null;
}
