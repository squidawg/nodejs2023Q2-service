import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { validate, v4 } from 'uuid';
import { Artist, CreatedArtist } from './model/artist.model';
import { HTTP_CODE } from '../utils/util.model';
import { database } from '../utils/helpers';

const pathToDb = 'fakeDb/artistDb.json';
@Injectable()
export class ArtistRepository {
  async findAll() {
    return database.getArtists;
  }
  async finOne(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const artist = database.getArtistById(id);
    if (!artist) {
      return HTTP_CODE.NOT_FOUND;
    }
    return artist;
  }
  async create(artist: CreatedArtist) {
    const id = v4();
    const newArtist = {
      id,
      ...artist,
    };
    database.setArtist(newArtist);
    return newArtist;
  }
  async update(id: string, content: CreatedArtist) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const artist = database.getArtistById(id);
    if (!artist) {
      return HTTP_CODE.NOT_FOUND;
    }
    const updatedArtist = { id, ...content };
    const updatedArtists = database.getArtists.map((artist: Artist) =>
      artist.id === id ? updatedArtist : artist,
    );
    database.setArtists(updatedArtists);
    return updatedArtist;
  }
  async delete(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const artist = database.getArtistById(id);
    if (!artist) {
      return HTTP_CODE.NOT_FOUND;
    }
    database.removeArtist(id);
    //set null to albums and tracks props
    database.getAlbums.map((obj) =>
      obj.artistId === id ? (obj.artistId = null) : obj,
    );
    database.getTracks.map((obj) =>
      obj.artistId === id ? (obj.artistId = null) : obj,
    );
  }
}
