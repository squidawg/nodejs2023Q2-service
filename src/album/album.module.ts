import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './album.repository';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController, AlbumRepository],
})
export class AlbumModule {}
