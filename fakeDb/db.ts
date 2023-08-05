import { Album } from '../src/album/model/album.model';
import { Track } from '../src/track/model/track.model';
import { Artist } from '../src/artist/model/artist.model';
import { Favorites } from '../src/favorites/model/favorites.model';
import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
