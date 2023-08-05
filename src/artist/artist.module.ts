import { forwardRef, Module } from "@nestjs/common";
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { TrackModule } from "../track/track.module";
import { AlbumModule } from "../album/album.module";
import { FavoritesModule } from "../favorites/favorites.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtistEntity]),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
