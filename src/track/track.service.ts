import { Injectable } from '@nestjs/common';
import { Track } from './model/track.model';
import { v4, validate } from 'uuid';
import { HTTP_CODE } from '../utils/util.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './entity/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity) private repo: Repository<TrackEntity>,
  ) {}
  async findOne(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const track = await this.repo.findOne({ where: { id } });
    if (!track) {
      return HTTP_CODE.NOT_FOUND;
    }
    return track;
  }
  findAll() {
    return this.repo.find();
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
      return HTTP_CODE.BAD_REQUEST;
    }
    const track = await this.repo.findOne({ where: { id } });
    if (!track) {
      return HTTP_CODE.NOT_FOUND;
    }
    const UpdatedTrack = { id, ...content };
    await this.repo.save(UpdatedTrack);
    return UpdatedTrack;
  }
  async delete(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const track = await this.repo.findOne({ where: { id } });
    if (!track) {
      return HTTP_CODE.NOT_FOUND;
    }
    Object.assign(track);
    await this.repo.delete(track);
    //dont forget to delete from favorites
    // favorites.delTracks(id);
    return HTTP_CODE.DELETED;
  }
}
