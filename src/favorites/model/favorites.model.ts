import { Artist } from '../../artist/model/artist.model';
import { Album } from '../../album/model/album.model';
import { Track } from '../../track/model/track.model';
import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface Favorites {
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}

export class Favs implements Favorites {
  @IsArray()
  @ApiProperty({ example: '[]' })
  albums: Album[] = [];
  @IsArray()
  @ApiProperty({ example: '[]' })
  artists: Artist[] = [];
  @IsArray()
  @ApiProperty({ example: '[]' })
  tracks: Track[] = [];
}
