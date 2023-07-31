import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/CreateAlbumDto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entity/album.entity';
import { Repository } from 'typeorm';
import { v4, validate } from 'uuid';
import { HTTP_CODE } from '../utils/util.model';
import { Album } from './model/album.model';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity) private repo: Repository<AlbumEntity>) {}
  findAll() {
    return this.repo.find();
  }
  async findOne(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const album = await this.repo.findOne({ where: { id } });
    if (!album) {
      return HTTP_CODE.NOT_FOUND;
    }
    return album;
  }
  async create(content: Album) {
    const id = v4();
    const newAlbum: Album = {
      id,
      ...content,
    };
    const album = await this.repo.create(newAlbum);
    await this.repo.save(album);
    return newAlbum;
  }
  async update(id: string, content: CreateAlbumDto) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const album = await this.repo.findOne({ where: { id } });
    if (!album) {
      return HTTP_CODE.NOT_FOUND;
    }
    const UpdatedAlbum = { id, ...content };
    await this.repo.save(UpdatedAlbum);
    return UpdatedAlbum;
  }
  async delete(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const album = await this.repo.findOne({ where: { id } });
    if (!album) {
      return HTTP_CODE.NOT_FOUND;
    }
    Object.assign(album);
    await this.repo.remove(album);
    // **set null to album property in db
    // database.getTracks.map((obj) =>
    //   obj.albumId === id ? (obj.albumId = null) : obj,
    // );
    //dont forget to delete from favorites
    // favorites.delAlbum(id);
    return HTTP_CODE.DELETED;
  }
}
