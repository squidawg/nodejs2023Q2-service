import { forwardRef, Module } from "@nestjs/common";
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackEntity } from './entity/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackEntity]),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
