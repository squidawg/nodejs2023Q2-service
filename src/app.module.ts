import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvPath } from './envs/envHelper';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from 'typeorm.config';
const envFilePath: string = getEnvPath(`dist/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true, load: [typeorm] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UsersModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
