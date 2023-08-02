import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entity/artist.entity';
import { TrackModule } from "../track/track.module";
import { AlbumModule } from "../album/album.module";

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity]), AlbumModule, TrackModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
