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
import { errorHandler, ErrorResponse, responseHandler } from '../utils/helpers';
import { ERROR_MSG, HTTP_CODE } from '../utils/util.model';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Artist Api')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}
  @ApiOperation({ summary: 'Get all records' })
  @ApiOkResponse({
    description: 'Get all records.',
    type: [CreateArtistDto],
  })
  @Get()
  getArtists() {
    return this.artistService.findAll();
  }
  @ApiOperation({ summary: 'Get record by Id' })
  @ApiBadRequestResponse({
    description: 'TrackId is invalid (not uuid)',
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    description: "Record with id === trackId doesn't exist",
    type: ErrorResponse,
  })
  @ApiOkResponse({
    description: 'Get record.',
    type: CreateArtistDto,
  })
  //@UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async getArtist(@Param('id') id: string, @Res() response) {
    const artist = await this.artistService.findOne(id);
    const err = errorHandler(artist, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.OK, artist);
  }
  @ApiOperation({ summary: 'Add record' })
  @ApiCreatedResponse({ type: CreateArtistDto })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
    type: ErrorResponse,
  })
  @Post()
  async create(@Body() content: CreateArtistDto) {
    return this.artistService.create(content);
  }
  @ApiOperation({ summary: 'Update record' })
  @ApiOkResponse({
    description: 'Updated record.',
    type: CreateArtistDto,
  })
  @ApiBadRequestResponse({
    description: 'TrackId is invalid (not uuid)',
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    description: "Record with id === trackId doesn't exist",
    type: ErrorResponse,
  })
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
  @ApiOperation({ summary: 'Delete record' })
  @ApiResponse({
    status: 204,
    description: 'Entity deleted, no return content',
  })
  @ApiBadRequestResponse({
    description: 'TrackId is invalid (not uuid)',
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    description: "Record with id === trackId doesn't exist",
    type: ErrorResponse,
  })
  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() response) {
    const artist = await this.artistService.delete(id);
    const err = errorHandler(artist, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.DELETED);
  }
}
