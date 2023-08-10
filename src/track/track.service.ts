import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Track } from './model/track.model';
import { v4, validate } from 'uuid';
import { HTTP_CODE } from '../utils/util.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity) private repo: Repository<TrackEntity>,
  ) {}
  async findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    const track = await this.repo.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Entity doesn't exist`);
    }
    return track;
  }
  async findAll() {
    return await this.repo.find();
  }
  async create(content: Track) {
    const id = v4();
    const newTrack: Track = {
      id,
      ...content,
    };
    const track = await this.repo.create(newTrack);
    await this.repo.save(track);
    return newTrack;
  }
  async update(id: string, content: Track) {
    if (!validate(id)) {
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    const track = await this.repo.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Entity doesn't exist`);
    }
    const UpdatedTrack = { id, ...content };
    await this.repo.save(UpdatedTrack);
    return UpdatedTrack;
  }
  async delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    const track = await this.repo.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Entity doesn't exist`);
    }
    Object.assign(track);
    await this.repo.remove(track);
    return HTTP_CODE.DELETED;
  }
  async findFavs() {
    const tracks = await this.repo.find({ where: { isFavourite: true } });
    tracks.slice().forEach((obj) => delete obj['isFavourite']);
    return tracks;
  }
  async addFavTrack(id: string) {
    const track = await this.repo.findOne({ where: { id } });
    if (!track) {
      throw new UnprocessableEntityException('UnprocessableEntityException');
    }
    delete track.isFavourite;
    const UpdatedTrack: TrackEntity = { isFavourite: true, ...track };
    await this.repo.save(UpdatedTrack);
    return UpdatedTrack;
  }
  async deleteFavTrack(id: string) {
    const track = await this.repo.findOne({ where: { id } });
    delete track.isFavourite;
    const UpdatedTrack = { isFavourite: false, ...track };
    await this.repo.save(UpdatedTrack);
  }
}
