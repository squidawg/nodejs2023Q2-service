import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { errorHandler, responseHandler } from '../utils/helpers';
import { ERROR_MSG, HTTP_CODE } from '../utils/util.model';
import { CreateAlbumDto } from './dto/CreateAlbumDto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @Get()
  getAlbums() {
    return this.albumService.findAll();
  }
  @Get('/:id')
  async getAlbum(@Param('id') id: string, @Res() response) {
    const album = await this.albumService.findOne(id);
    const err = errorHandler(album, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.OK, album);
  }
  @Post()
  async create(@Body() content: CreateAlbumDto) {
    return this.albumService.create(content);
  }
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() content: CreateAlbumDto,
    @Res() response,
  ) {
    const artist = await this.albumService.update(id, content);
    const err = errorHandler(artist, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.OK, artist);
  }
  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() response) {
    const artist = await this.albumService.delete(id);
    const err = errorHandler(artist, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.DELETED);
  }
}
