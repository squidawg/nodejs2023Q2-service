import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/CreateArtistDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from './entity/artist.entity';
import { v4, validate } from 'uuid';
import { HTTP_CODE } from '../utils/util.model';
import { Artist } from './model/artist.model';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity) private repo: Repository<ArtistEntity>
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
    await this.repo.delete(artist);
    //dont forget to delete from favorites
    // database.removeArtist(id);
    // //set null to albums and tracks props
    // database.getAlbums.map((obj) =>
    //   obj.artistId === id ? (obj.artistId = null) : obj,
    // );
    // database.getTracks.map((obj) =>
    //   obj.artistId === id ? (obj.artistId = null) : obj,
    // );
    // favorites.delArtist(id);
    return HTTP_CODE.DELETED;
  }
}
