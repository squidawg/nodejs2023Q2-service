import { Injectable } from '@nestjs/common';
import { v4, validate } from 'uuid';
import { HTTP_CODE } from '../utils/util.model';
import { Album } from './model/album.model';
import { database, favorites } from '../utils/helpers';

@Injectable()
export class AlbumRepository {
  async findAll() {
    return database.getAlbums;
  }

  async finOne(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const album = database.getAlbumById(id);
    if (!album) {
      return HTTP_CODE.NOT_FOUND;
    }
    return album;
  }

  async create(artist: Album) {
    const id = v4();
    const newAlbum = {
      id,
      ...artist,
    };
    database.setAlbum(newAlbum);
    return newAlbum;
  }

  async update(id: string, content: Album) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const album = database.getAlbumById(id);
    if (!album) {
      return HTTP_CODE.NOT_FOUND;
    }
    const updatedAlbum = { id, ...content };
    const updatedAlbums = database.getAlbums.map((album: Album) =>
      album.id === updatedAlbum.id ? updatedAlbum : album,
    );
    database.setAlbums(updatedAlbums);
    return updatedAlbum;
  }

  async delete(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const album = database.getAlbumById(id);
    if (!album) {
      return HTTP_CODE.NOT_FOUND;
    }
    database.removeAlbum(id);
    //set null to album prop
    database.getTracks.map((obj) =>
      obj.albumId === id ? (obj.albumId = null) : obj,
    );
    favorites.delAlbum(id);
  }
}
