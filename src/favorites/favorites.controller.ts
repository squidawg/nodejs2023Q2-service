import { Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('favs')
export class FavoritesController {
  @Get()
  getFavs() {
    return 'all_favs';
  }
  @Post('/track/:id')
  addFavTrack(@Param('id') id: string) {
    return 'fav track';
  }
  @Delete('/track/:id')
  delFavTrack(@Param('id') id: string) {
    return 'deleted';
  }
  @Post('/album/:id')
  addFavAlbum(@Param('id') id: string) {
    return 'fav album';
  }
  @Delete('/album/:id')
  delFavAlbum(@Param('id') id: string) {
    return 'deleted';
  }
  @Post('/artist/:id')
  addFavArtist(@Param('id') id: string) {
    return 'fav artist';
  }
  @Delete('/artist/:id')
  delFavArtist(@Param('id') id: string) {
    return 'deleted';
  }
}
