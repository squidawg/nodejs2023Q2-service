import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/CreateTrackDto';
import { Serialize } from '../interceptors/serialize';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { TrackEntity } from './entities/track.entity';
import {
  ApiDelete,
  ApiGet,
  ApiGetById,
  ApiPost,
  ApiPut,
} from '../utils/decorator.service';
@ApiTags('Track Api')
@Serialize(TrackEntity)
@UsePipes(new ValidationPipe({ whitelist: true }))
@ApiBearerAuth('access-token')
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @ApiGet(CreateTrackDto)
  @Get()
  getTracks() {
    return this.trackService.findAll();
  }
  @ApiGetById(CreateTrackDto)
  @Get('/:id')
  async getTrack(@Param('id') id: string) {
    return await this.trackService.findOne(id);
  }
  @ApiPost(CreateTrackDto)
  @ApiBody({ type: CreateTrackDto })
  @Post()
  create(@Body() content: CreateTrackDto) {
    return this.trackService.create(content);
  }
  @ApiPut(CreateTrackDto)
  @Put('/:id')
  async update(@Param('id') id: string, @Body() content: CreateTrackDto) {
    return await this.trackService.update(id, content);
  }
  @ApiDelete()
  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() response) {
    const track = await this.trackService.delete(id);
    return response.status(track).send();
  }
}
