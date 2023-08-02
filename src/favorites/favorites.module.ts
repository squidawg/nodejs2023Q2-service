import { forwardRef, Module } from "@nestjs/common";
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TrackModule } from "../track/track.module";
import { AlbumModule } from "../album/album.module";
import { ArtistModule } from "../artist/artist.module";

@Module({
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
