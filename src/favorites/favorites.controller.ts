import { Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { errorHandler, ErrorResponse, responseHandler } from '../utils/helpers';
import { ERROR_MSG, HTTP_CODE } from '../utils/util.model';
import { Favs } from '../../fakeDb/db';
import {
  ApiBadRequestResponse, ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
@ApiTags('Favorites Api')
@Controller('favs')
export class FavoritesController {
  constructor(private favoriteService: FavoritesService) {}
  @ApiOperation({ summary: 'Get all Records' })
  @ApiOkResponse({
    description: 'Get all records',
    type: Favs,
  })
  @Get()
  getFavs() {
    return this.favoriteService.findAll();
  }
  @ApiOperation({ summary: 'Add record' })
  @ApiCreatedResponse({
    description: 'Created',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity',
  })
  @Post('/track/:id')
  addFavTrack(@Param('id') id: string, @Res() response) {
    const track = this.favoriteService.create('track', id);
    const err = errorHandler(track, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.CREATED, track);
  }
  @ApiOperation({ summary: 'Delete record' })
  @ApiResponse({
    status: 204,
    description: 'User deleted, no return content',
  })
  @ApiBadRequestResponse({
    description: 'TrackId is invalid (not uuid)',
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    description: "Record with id === trackId doesn't exist",
    type: ErrorResponse,
  })
  @Delete('/track/:id')
  delFavTrack(@Param('id') id: string, @Res() response) {
    const track = this.favoriteService.delete('track', id);
    const err = errorHandler(track, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.DELETED, track);
  }
  @ApiOperation({ summary: 'Add record' })
  @ApiCreatedResponse({
    description: 'Created',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity',
  })
  @Post('/album/:id')
  addFavAlbum(@Param('id') id: string, @Res() response) {
    const album = this.favoriteService.create('album', id);
    const err = errorHandler(album, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.CREATED, album);
  }
  @ApiOperation({ summary: 'Delete record' })
  @ApiResponse({
    status: 204,
    description: 'User deleted, no return content',
  })
  @ApiBadRequestResponse({
    description: 'TrackId is invalid (not uuid)',
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    description: "Record with id === trackId doesn't exist",
    type: ErrorResponse,
  })
  @Delete('/album/:id')
  delFavAlbum(@Param('id') id: string, @Res() response) {
    const album = this.favoriteService.delete('album', id);
    const err = errorHandler(album, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.DELETED, album);
  }
  @ApiOperation({ summary: 'Add record' })
  @ApiCreatedResponse({
    description: 'Created',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity',
  })
  @Post('/artist/:id')
  addFavArtist(@Param('id') id: string, @Res() response) {
    const artist = this.favoriteService.create('artist', id);
    const err = errorHandler(artist, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.CREATED, artist);
  }
  @ApiOperation({ summary: 'Delete record' })
  @ApiResponse({
    status: 204,
    description: 'User deleted, no return content',
  })
  @ApiBadRequestResponse({
    description: 'TrackId is invalid (not uuid)',
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    description: "Record with id === trackId doesn't exist",
    type: ErrorResponse,
  })
  @Delete('/artist/:id')
  delFavArtist(@Param('id') id: string, @Res() response) {
    const artist = this.favoriteService.delete('artist', id);
    const err = errorHandler(artist, ERROR_MSG.ARTIST_ID);
    return responseHandler(err, response, HTTP_CODE.DELETED, artist);
  }
}
