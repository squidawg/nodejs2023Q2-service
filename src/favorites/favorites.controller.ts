import { Controller, Delete, Get, Param, Post, Res, UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { errorHandler, ErrorResponse, responseHandler } from '../utils/helpers';
import { ERROR_MSG, HTTP_CODE } from '../utils/util.model';
import { Favs } from '../../fakeDb/db';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
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
  @UseInterceptors(ClassSerializerInterceptor)
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
  async addFavTrack(@Param('id') id: string, @Res() response) {
    const track = await this.favoriteService.addFavTrack(id);
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
  async delFavTrack(@Param('id') id: string, @Res() response) {
    const track = await this.favoriteService.delFavTrack(id);
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
  async addFavAlbum(@Param('id') id: string, @Res() response) {
    const album = await this.favoriteService.addFavAlbum(id);
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
  async delFavAlbum(@Param('id') id: string, @Res() response) {
    const album = await this.favoriteService.delFavAlbum(id);
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
  async addFavArtist(@Param('id') id: string, @Res() response) {
    const artist = await this.favoriteService.addFavArtist(id);
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
  async delFavArtist(@Param('id') id: string, @Res() response) {
    const artist = await this.favoriteService.delFavArist( id);
    const err = errorHandler(artist, ERROR_MSG.ARTIST_ID);
    return responseHandler(err, response, HTTP_CODE.DELETED, artist);
  }
}
