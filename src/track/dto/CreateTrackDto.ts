import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Track } from '../model/track.model';
import { Expose } from 'class-transformer';

export class CreateTrackDto implements Track {
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({ example: 'Smena Stadiy' })
  name: string;
  @IsString()
  @IsOptional()
  @Expose()
  @ApiPropertyOptional({ example: 'uuid', description: 'optional property' })
  artistId?: string | null;
  @IsString()
  @IsOptional()
  @Expose()
  @ApiPropertyOptional({ example: 'uuid', description: 'optional property' })
  albumId?: string | null;
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({ example: '381' })
  duration: number;
}
