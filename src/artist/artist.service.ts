import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CreateArtistDto } from './dto/CreateArtistDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { v4, validate } from 'uuid';
import { HTTP_CODE } from '../utils/util.model';
import { Artist } from './model/artist.model';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity) private repo: Repository<ArtistEntity>,
    @Inject(forwardRef(() => TrackService)) private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService)) private albumService: AlbumService
  ) {}
  async findOne(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const artist = await this.repo.findOne({ where: { id } });
    if (!artist) {
      return HTTP_CODE.NOT_FOUND;
    }
    return artist;
  }
  findAll() {
    return this.repo.find();
  }
  async create(content: CreateArtistDto) {
    const id = v4();
    const newArtist: Artist = {
      id,
      ...content,
    };
    const track = await this.repo.create(newArtist);
    await this.repo.save(track);
    return newArtist;
  }
  async update(id: string, content: CreateArtistDto) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const track = await this.repo.findOne({ where: { id } });
    if (!track) {
      return HTTP_CODE.NOT_FOUND;
    }
    const UpdatedArtist = { id, ...content };
    await this.repo.save(UpdatedArtist);
    return UpdatedArtist;
  }
  async delete(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const artist = await this.repo.findOne({ where: { id } });
    if (!artist) {
      return HTTP_CODE.NOT_FOUND;
    }
    Object.assign(artist);
    const albums = await this.albumService.findAll();
    const tracks = await this.trackService.findAll();
    albums.forEach((album) => {
      if (album.artistId === id) {
        const { id, ...rest } = album;
        rest.artistId = null;
        this.albumService.update(id, rest);
      }
    });
    tracks.forEach((track) => {
      if (track.artistId === id) {
        const { id, ...rest } = track;
        rest.artistId = null;
        this.trackService.update(id, rest);
      }
    });
    await this.repo.remove(artist);
    return HTTP_CODE.DELETED;
  }
  findFavs() {
    return this.repo.find({ where: { isFavourite: true } });
  }
  async addFavArtist(id: string) {
    const artist = await this.repo.findOne({ where: { id } });
    if (!artist) {
      return HTTP_CODE.UNPROC_CONTENT;
    }
    const { isFavourite, ...rest } = artist;
    const UpdatedArtist: ArtistEntity = { isFavourite: true, ...rest };
    await this.repo.save(UpdatedArtist);
    return UpdatedArtist;
  }
  async deleteFavArtist(id: string) {
    const artist = await this.repo.findOne({ where: { id } });
    if (!artist) {
      return;
    }
    const { isFavourite, ...rest } = artist;
    const UpdatedArtist: ArtistEntity = { isFavourite: false, ...rest };
    await this.repo.save(UpdatedArtist);
    return UpdatedArtist;
  }
}
