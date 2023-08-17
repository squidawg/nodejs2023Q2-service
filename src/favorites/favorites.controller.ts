import { Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiBearerAuth, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { Favs } from './model/favorites.model';
import { ApiDelete, ApiGet, ApiPost } from '../utils/decorator.service';
@ApiTags('Favorites Api')
@ApiBearerAuth('access-token')
@Controller('favs')
export class FavoritesController {
  constructor(private favoriteService: FavoritesService) {}
  @ApiGet(Favs)
  @Get()
  getFavs() {
    return this.favoriteService.findAll();
  }
  @ApiPost()
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable entity',
  })
  @Post('/track/:id')
  async addFavTrack(@Param('id') id: string) {
    return await this.favoriteService.addFavTrack(id);
  }
  @ApiDelete()
  @Delete('/track/:id')
  async delFavTrack(@Param('id') id: string, @Res() response) {
    const track = await this.favoriteService.delFavTrack(id);
    return response.status(track).send();
  }
  @ApiPost()
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity',
  })
  @Post('/album/:id')
  async addFavAlbum(@Param('id') id: string) {
    return await this.favoriteService.addFavAlbum(id);
  }
  @ApiDelete()
  @Delete('/album/:id')
  async delFavAlbum(@Param('id') id: string, @Res() response) {
    const album = await this.favoriteService.delFavAlbum(id);
    return response.status(album).send();
  }
  @ApiPost()
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity',
  })
  @Post('/artist/:id')
  async addFavArtist(@Param('id') id: string) {
    return await this.favoriteService.addFavArtist(id);
  }
  @ApiDelete()
  @Delete('/artist/:id')
  async delFavArtist(@Param('id') id: string, @Res() response) {
    const artist = await this.favoriteService.delFavArist(id);
    return response.status(artist).send();
  }
}
