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
import { errorHandler, responseHandler } from '../utils/error-handler';
import { ERROR_MSG, HTTP_CODE } from '../users/model/users.model';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Get()
  getTracks() {
    return this.trackService.findAll();
  }
  @Get('/:id')
  async getTrack(@Param('id') id: string, @Res() response) {
    const track = await this.trackService.findOne(id);
    const err = errorHandler(track, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.OK, track);
  }
  @Post()
  create(@Body() content: CreateTrackDto) {
    return this.trackService.create(content);
  }
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
  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() response) {
    const track = await this.trackService.delete(id);
    const err = errorHandler(track, ERROR_MSG.TRACK_ID);
    return responseHandler(err, response, HTTP_CODE.DELETED);
  }
}
