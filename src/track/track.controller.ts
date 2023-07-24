import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from "./dto/CreateTrackDto";

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Get()
  getTracks() {
    return this.trackService.findAll();
  }
  @Get('/:id')
  getTrack(@Param('id') id: string) {
    return this.trackService.findOne(id);
  }
  @Post()
  create(@Body() content: CreateTrackDto) {
    return this.trackService.create(content);
  }
  @Put('/:id')
  update(@Param('id') id: string, @Body() content: CreateTrackDto) {
    return this.trackService.update(id, content);
  }
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.trackService.delete(id);
  }
}
