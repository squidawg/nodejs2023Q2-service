import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { validate, v4 } from 'uuid';
import { CreatedArtist } from './model/artist.model';
import { HTTP_CODE } from '../utils/util.model';
const pathToDb = 'fakeDb/artistDb.json';
@Injectable()
export class ArtistRepository {
  async findAll() {
    const content = await readFile(pathToDb, 'utf-8');
    const artists = JSON.parse(content);
    return artists;
  }
  async finOne(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const content = await readFile(pathToDb, 'utf-8');
    const artists = JSON.parse(content);
    if (!artists[id]) {
      return HTTP_CODE.NOT_FOUND;
    }
    return artists[id];
  }
  async create(artist: CreatedArtist) {
    const content = await readFile(pathToDb, 'utf-8');
    const artists = JSON.parse(content);
    const id = v4();
    artists[id] = {
      id,
      ...artist,
    };
    await writeFile(pathToDb, JSON.stringify(artists));
  }
  async update(id: string, content: CreatedArtist) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const contents = await readFile(pathToDb, 'utf-8');
    const artists = JSON.parse(contents);
    if (!artists[id]) {
      return HTTP_CODE.NOT_FOUND;
    }
    artists[id] = { id, ...content };
    await writeFile(pathToDb, JSON.stringify(artists));
  }
  async delete(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const contents = await readFile(pathToDb, 'utf-8');
    const artists = JSON.parse(contents);
    if (!artists[id]) {
      return HTTP_CODE.NOT_FOUND;
    }
    delete artists[id];
    await writeFile(pathToDb, JSON.stringify(artists));
  }
}
