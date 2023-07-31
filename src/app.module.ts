import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { DatabaseModule } from './shared/typeorm.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './envs/envHelper';

const envFilePath: string = getEnvPath(`dist/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    UsersModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
