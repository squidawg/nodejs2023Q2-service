import { Module } from "@nestjs/common";
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entity/album.entity';
import { TrackModule } from "../track/track.module";

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity]), TrackModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
