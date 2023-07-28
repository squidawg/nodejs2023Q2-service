import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from './favorites.repository';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository]
})
export class FavoritesModule {}
