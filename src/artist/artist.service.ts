import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    @Inject(forwardRef(() => AlbumService)) private albumService: AlbumService,
  ) {}
  async findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    const artist = await this.repo.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Entity doesn't exist`);
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
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    const artist = await this.repo.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Entity doesn't exist`);
    }
    const UpdatedArtist = { id, ...content };
    await this.repo.save(UpdatedArtist);
    return UpdatedArtist;
  }
  async delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    const artist = await this.repo.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Entity doesn't exist`);
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
  async findFavs() {
    const artists = await this.repo.find({ where: { isFavourite: true } });
    artists.slice().forEach((obj) => delete obj['isFavourite']);
    return artists;
  }
  async addFavArtist(id: string) {
    const artist = await this.repo.findOne({ where: { id } });
    if (!artist) {
      throw new UnprocessableEntityException('UnprocessableEntityException');
    }
    delete artist.isFavourite;
    const UpdatedArtist: ArtistEntity = { isFavourite: true, ...artist };
    await this.repo.save(UpdatedArtist);
    return UpdatedArtist;
  }
  async deleteFavArtist(id: string) {
    const artist = await this.repo.findOne({ where: { id } });
    if (!artist) {
      throw new UnprocessableEntityException('UnprocessableEntityException');
    }
    delete artist.isFavourite;
    const UpdatedArtist: ArtistEntity = { isFavourite: false, ...artist };
    await this.repo.save(UpdatedArtist);
    return UpdatedArtist;
  }
}
