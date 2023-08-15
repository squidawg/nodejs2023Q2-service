import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { HTTP_CODE } from '../utils/util.model';
import { ArtistService } from '../artist/artist.service';
import { AlbumEntity } from '../album/entities/album.entity';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => TrackService)) private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService)) private albumsService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
  ) {}
  async findAll() {
    const tracks = await this.trackService.findFavs();
    const albums = await this.albumsService.findFavs();
    const artists = await this.artistService.findFavs();
    return { tracks, albums, artists };
  }
  async addFavTrack(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    const track = await this.trackService.addFavTrack(id);
    if (!track) {
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    return track;
  }
  async addFavAlbum(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    const updAlbum = await this.albumsService.addFavAlbum(id);
    if (!updAlbum) {
      throw new UnprocessableEntityException('UnprocessableEntityException');
    }
    return updAlbum as AlbumEntity;
  }
  async addFavArtist(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    const updArtist = await this.artistService.addFavArtist(id);
    if (!updArtist) {
      throw new UnprocessableEntityException('UnprocessableEntityException');
    }
    return updArtist;
  }
  async delFavTrack(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    await this.trackService.deleteFavTrack(id);
    return HTTP_CODE.DELETED;
  }
  async delFavAlbum(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    await this.albumsService.deleteFavAlbum(id);
    return HTTP_CODE.DELETED;
  }
  async delFavArist(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    await this.artistService.deleteFavArtist(id);
    return HTTP_CODE.DELETED;
  }
}
