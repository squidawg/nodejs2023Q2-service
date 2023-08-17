import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res, UsePipes, ValidationPipe
} from "@nestjs/common";
import { CreateArtistDto } from './dto/CreateArtistDto';
import { ArtistService } from './artist.service';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Serialize } from '../interceptors/serialize';
import {
  ApiDelete,
  ApiGet,
  ApiGetById,
  ApiPost,
  ApiPut,
} from '../utils/decorator.service';
import { ArtistEntity } from './entities/artist.entity';
@ApiTags('Artist Api')
@Serialize(ArtistEntity)
@UsePipes(new ValidationPipe({ whitelist: true }))
@ApiBearerAuth('access-token')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}
  @ApiGet(CreateArtistDto)
  @Get()
  getArtists() {
    return this.artistService.findAll();
  }
  @ApiGetById(CreateArtistDto)
  @Get('/:id')
  async getArtist(@Param('id') id: string) {
    return await this.artistService.findOne(id);
  }
  @ApiPost(CreateArtistDto)
  @Post()
  async create(@Body() content: CreateArtistDto) {
    return await this.artistService.create(content);
  }
  @ApiPut(CreateArtistDto)
  @Put('/:id')
  async update(@Param('id') id: string, @Body() content: CreateArtistDto) {
    return await this.artistService.update(id, content);
  }
  @ApiDelete()
  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() response) {
    const artist = await this.artistService.delete(id);
    return response.status(artist).send();
  }
}
