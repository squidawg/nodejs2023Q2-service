import { Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { errorHandler, responseHandler } from '../utils/helpers';
import { ERROR_MSG, HTTP_CODE } from '../utils/util.model';

@Controller('favs')
export class FavoritesController {
  constructor(private favoriteService: FavoritesService) {}
  @Get()
  getFavs() {
    return this.favoriteService.findAll();
  }
  @Post('/track/:id')
  addFavTrack(@Param('id') id: string, @Res() response) {
    const track = this.favoriteService.create('track', id);
    const err = errorHandler(track, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.CREATED, track);
  }
  @Delete('/track/:id')
  delFavTrack(@Param('id') id: string, @Res() response) {
    const track = this.favoriteService.delete('track', id);
    const err = errorHandler(track, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.DELETED, track);
  }
  @Post('/album/:id')
  addFavAlbum(@Param('id') id: string, @Res() response) {
    const album = this.favoriteService.create('album', id);
    const err = errorHandler(album, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.CREATED, album);
  }
  @Delete('/album/:id')
  delFavAlbum(@Param('id') id: string, @Res() response) {
    const album = this.favoriteService.delete('album', id);
    const err = errorHandler(album, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.DELETED, album);
  }
  @Post('/artist/:id')
  addFavArtist(@Param('id') id: string, @Res() response) {
    const artist = this.favoriteService.create('artist', id);
    const err = errorHandler(artist, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.CREATED, artist);
  }
  @Delete('/artist/:id')
  delFavArtist(@Param('id') id: string, @Res() response) {
    const artist = this.favoriteService.delete('artist', id);
    const err = errorHandler(artist, ERROR_MSG.ARTIST_ID);
    return responseHandler(err, response, HTTP_CODE.DELETED, artist);
  }
}
