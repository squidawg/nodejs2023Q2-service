import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { UsersRepository } from './users/users.repository';
import { TrackController } from './track/track.controller';
import { TrackModule } from './track/track.module';
import { TrackRepository } from './track/track.repository';
import { TrackService } from './track/track.service';
import { ArtistController } from './artist/artist.controller';
import { ArtistModule } from './artist/artist.module';
import { ArtistService } from './artist/artist.service';
import { ArtistRepository } from './artist/artist.repository';
import { AlbumModule } from './album/album.module';
import { AlbumController } from './album/album.controller';
import { AlbumService } from './album/album.service';
import { AlbumRepository } from './album/album.repository';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesModule } from './favorites/favorites.module';
import { FavoritesService } from './favorites/favorites.service';

@Module({
  imports: [
    UsersModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
  ],
  controllers: [
    AppController,
    UsersController,
    TrackController,
    ArtistController,
    AlbumController,
    FavoritesController,
  ],
  providers: [
    AppService,
    UsersService,
    TrackService,
    ArtistService,
    AlbumService,
    FavoritesService,
    UsersRepository,
    TrackRepository,
    ArtistRepository,
    AlbumRepository,
  ],
})
export class AppModule {}
