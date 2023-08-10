import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/CreateAlbumDto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { Repository } from 'typeorm';
import { v4, validate } from 'uuid';
import { HTTP_CODE } from '../utils/util.model';
import { Album } from './model/album.model';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity) private repo: Repository<AlbumEntity>,
    @Inject(forwardRef(() => TrackService)) private trackService: TrackService,
  ) {}
  findAll() {
    return this.repo.find();
  }
  async findFavs() {
    const album = await this.repo.find({ where: { isFavourite: true } });
    album.slice().forEach((obj) => delete obj['isFavourite']);
    return album;
  }
  async findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    const album = await this.repo.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Entity doesn't exist`);
    }
    return album;
  }
  async create(content: Album) {
    const id = v4();
    const newAlbum = {
      id,
      ...content,
    };
    const album = await this.repo.create(newAlbum);
    await this.repo.save(album);
    return newAlbum;
  }
  async update(id: string, content: CreateAlbumDto) {
    if (!validate(id)) {
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    const album = await this.repo.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Entity doesn't exist`);
    }
    const UpdatedAlbum = { id, ...content };
    await this.repo.save(UpdatedAlbum);
    return UpdatedAlbum;
  }
  async delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    const album = await this.repo.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Entity doesn't exist`);
    }
    Object.assign(album);
    const tracks = await this.trackService.findAll();
    tracks.forEach((track) => {
      if (track.albumId === id) {
        const { id, ...rest } = track;
        rest.albumId = null;
        this.trackService.update(id, rest);
      }
    });
    await this.repo.remove(album);
    return HTTP_CODE.DELETED;
  }
  async addFavAlbum(id: string) {
    const album = await this.repo.findOne({ where: { id } });
    if (!album) {
      throw new UnprocessableEntityException('UnprocessableEntityException');
    }
    delete album.isFavourite;
    const UpdatedAlbum: AlbumEntity = { isFavourite: true, ...album };
    await this.repo.save(UpdatedAlbum);
    return UpdatedAlbum;
  }
  async deleteFavAlbum(id: string) {
    const album = await this.repo.findOne({ where: { id } });
    if (!album) {
      throw new UnprocessableEntityException('UnprocessableEntityException');
    }
    delete album.isFavourite;
    const UpdatedAlbum: AlbumEntity = { isFavourite: false, ...album };
    await this.repo.save(UpdatedAlbum);
    return UpdatedAlbum;
  }
}
