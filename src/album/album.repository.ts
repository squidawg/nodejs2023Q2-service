import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { v4, validate } from 'uuid';
import { HTTP_CODE } from '../utils/util.model';
import { Album } from './model/album.model';
const pathToDb = 'fakeDb/album.db.json';

@Injectable()
export class AlbumRepository {
  async findAll() {
    const content = await readFile(pathToDb, 'utf-8');
    const albums = JSON.parse(content);
    return albums;
  }
  async finOne(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const content = await readFile(pathToDb, 'utf-8');
    const albums = JSON.parse(content);
    if (!albums[id]) {
      return HTTP_CODE.NOT_FOUND;
    }
    return albums[id];
  }
  async create(artist: Album) {
    const content = await readFile(pathToDb, 'utf-8');
    const albums = JSON.parse(content);
    const id = v4();
    albums[id] = {
      id,
      ...artist,
    };
    await writeFile(pathToDb, JSON.stringify(albums));
  }
  async update(id: string, content: Album) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const contents = await readFile(pathToDb, 'utf-8');
    const albums = JSON.parse(contents);
    if (!albums[id]) {
      return HTTP_CODE.NOT_FOUND;
    }
    albums[id] = { id, ...content };
    await writeFile(pathToDb, JSON.stringify(albums));
  }
  async delete(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const contents = await readFile(pathToDb, 'utf-8');
    const albums = JSON.parse(contents);
    if (!albums[id]) {
      return HTTP_CODE.NOT_FOUND;
    }
    delete albums[id];
    await writeFile(pathToDb, JSON.stringify(albums));
  }
}
