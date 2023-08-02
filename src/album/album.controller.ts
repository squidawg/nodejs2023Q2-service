import {
  Body, ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res, UseInterceptors
} from "@nestjs/common";
import { AlbumService } from './album.service';
import { errorHandler, ErrorResponse, responseHandler } from '../utils/helpers';
import { ERROR_MSG, HTTP_CODE } from '../utils/util.model';
import { CreateAlbumDto } from './dto/CreateAlbumDto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Album Api')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @ApiOperation({ summary: 'Get all records' })
  @ApiOkResponse({
    description: 'Get all records.',
    type: [CreateAlbumDto],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAlbums() {
    return this.albumService.findAll();
  }
  @ApiOperation({ summary: 'Get record by Id' })
  @ApiBadRequestResponse({
    description: 'trackId is invalid (not uuid)',
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    description: "record with id === trackId doesn't exist",
    type: ErrorResponse,
  })
  @ApiOkResponse({
    description: 'Get all records.',
    type: [CreateAlbumDto],
  })
  // @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async getAlbum(@Param('id') id: string, @Res() response) {
    const album = await this.albumService.findOne(id);
    const err = errorHandler(album, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.OK, album);
  }
  @ApiOperation({ summary: 'Add record' })
  @ApiCreatedResponse({ type: CreateAlbumDto })
  @ApiBadRequestResponse({
    description: 'request body does not contain required fields',
    type: ErrorResponse,
  })
  @ApiBody({ type: CreateAlbumDto })
  @Post()
  async create(@Body() content: CreateAlbumDto) {
    return this.albumService.create(content);
  }
  @ApiOperation({ summary: 'Update record' })
  @ApiOkResponse({
    description: 'Get all records.',
    type: [CreateAlbumDto],
  })
  @ApiBadRequestResponse({
    description: 'trackId is invalid (not uuid)',
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    description: "record with id === trackId doesn't exist",
    type: ErrorResponse,
  })
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
  @ApiOperation({ summary: 'Delete record' })
  @ApiResponse({
    status: 204,
    description: 'Entity deleted, no return content',
  })
  @ApiBadRequestResponse({
    description: 'trackId is invalid (not uuid)',
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    description: "record with id === trackId doesn't exist",
    type: ErrorResponse,
  })
  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() response) {
    const artist = await this.albumService.delete(id);
    const err = errorHandler(artist, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.DELETED);
  }
}
