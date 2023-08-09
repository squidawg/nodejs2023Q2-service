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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/CreateTrackDto';
import { errorHandler, ErrorResponse, responseHandler } from '../utils/helpers';
import { ERROR_MSG, HTTP_CODE } from '../utils/util.model';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';
@ApiTags('Track Api')
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @ApiOperation({ summary: 'Get all records' })
  @ApiOkResponse({
    description: 'Get all records.',
    type: [CreateTrackDto],
  })
  @Get()
  getTracks() {
    return this.trackService.findAll();
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
    description: 'Get record by Id.',
    type: CreateTrackDto,
  })
  //@UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async getTrack(@Param('id') id: string, @Res() response) {
    const track = await this.trackService.findOne(id);
    const err = errorHandler(track, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.OK, track);
  }
  @ApiOperation({ summary: 'Add record' })
  @ApiCreatedResponse({ type: CreateTrackDto })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
    type: ErrorResponse,
  })
  @ApiBody({ type: CreateTrackDto })
  @Post()
  create(@Body() content: CreateTrackDto) {
    return this.trackService.create(content);
  }
  @ApiOperation({ summary: 'Update record' })
  @ApiOkResponse({
    description: 'Updated record.',
    type: CreateTrackDto,
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
    @Body() content: CreateTrackDto,
    @Res() response,
  ) {
    const track = await this.trackService.update(id, content);
    const err = errorHandler(track, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.OK, track);
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
    const track = await this.trackService.delete(id);
    const err = errorHandler(track, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.DELETED);
  }
}
