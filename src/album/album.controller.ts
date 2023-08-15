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
import { CreateAlbumDto } from './dto/CreateAlbumDto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Serialize } from '../interceptors/serialize';
import { AlbumEntity } from './entities/album.entity';
import {
  ApiDelete,
  ApiGet,
  ApiGetById,
  ApiPost,
  ApiPut,
} from '../utils/decorator.service';
@ApiTags('Album Api')
@Serialize(AlbumEntity)
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @ApiGet(CreateAlbumDto)
  @Get()
  getAlbums() {
    return this.albumService.findAll();
  }
  @ApiGetById(CreateAlbumDto)
  @Get('/:id')
  async getAlbum(@Param('id') id: string) {
    return await this.albumService.findOne(id);
  }
  @ApiPost(CreateAlbumDto)
  @ApiBody({ type: CreateAlbumDto })
  @Post()
  async create(@Body() content: CreateAlbumDto) {
    return this.albumService.create(content);
  }
  @ApiPut(CreateAlbumDto)
  @Put('/:id')
  async update(@Param('id') id: string, @Body() content: CreateAlbumDto) {
    return await this.albumService.update(id, content);
  }
  @ApiDelete()
  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() response) {
    const album = await this.albumService.delete(id);
    return response.status(album).send();
  }
}
