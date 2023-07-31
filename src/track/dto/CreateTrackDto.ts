import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Track } from '../model/track.model';

export class CreateTrackDto implements Track {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Smena Stadiy' })
  name: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'uuid', description: 'optional property' })
  artistId?: string | null;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'uuid', description: 'optional property' })
  albumId?: string | null;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: '381' })
  duration: number;
}
