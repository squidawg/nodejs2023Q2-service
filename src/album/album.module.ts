import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './album.repository';

@Module({
  providers: [AlbumService, AlbumRepository],
  controllers: [AlbumController],
})
export class AlbumModule {}
