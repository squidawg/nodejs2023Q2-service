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

@Module({
  imports: [UsersModule, TrackModule, ArtistModule],
  controllers: [
    AppController,
    UsersController,
    TrackController,
    ArtistController,
  ],
  providers: [
    AppService,
    UsersService,
    TrackService,
    ArtistService,
    UsersRepository,
    TrackRepository,
    ArtistRepository,
  ],
})
export class AppModule {}
