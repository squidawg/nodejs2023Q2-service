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
import { CreateArtistDto } from './dto/CreateArtistDto';
import { ArtistService } from './artist.service';
import { errorHandler, responseHandler } from '../utils/helpers';
import { ERROR_MSG, HTTP_CODE } from '../utils/util.model';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}
  @Get()
  getArtists() {
    return this.artistService.findAll();
  }
  @Get('/:id')
  async getArtist(@Param('id') id: string, @Res() response) {
    const artist = await this.artistService.findOne(id);
    const err = errorHandler(artist, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.OK, artist);
  }
  @Post()
  async create(@Body() content: CreateArtistDto) {
    return this.artistService.create(content);
  }
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() content: CreateArtistDto,
    @Res() response,
  ) {
    const artist = await this.artistService.update(id, content);
    const err = errorHandler(artist, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.OK, artist);
  }
  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() response) {
    const artist = await this.artistService.delete(id);
    const err = errorHandler(artist, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.DELETED);
  }
}
