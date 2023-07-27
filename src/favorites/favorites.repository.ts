import { Injectable } from '@nestjs/common';
import { database, favorites } from '../utils/helpers';
import { HTTP_CODE } from '../utils/util.model';
import { validate } from 'uuid';

@Injectable()
export class FavoritesRepository {
  findAll() {
    return favorites;
  }
  create(cmd: string, id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    switch (cmd) {
      case 'track':
        const track = database.getTrackById(id);
        if (!track) {
          return HTTP_CODE.UNPROC_CONTENT;
        }
        favorites.setTrack(track);
        break;
      case 'album':
        const album = database.getAlbumById(id);
        if (!album) {
          return HTTP_CODE.UNPROC_CONTENT;
        }
        favorites.setAlbum(album);
        break;
      case 'artist':
        const artist = database.getArtistById(id);
        if (!artist) {
          return HTTP_CODE.UNPROC_CONTENT;
        }
        favorites.setArtist(artist);
        break;
    }
    return HTTP_CODE.CREATED;
  }
  delete(cmd: string, id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    switch (cmd) {
      case 'track':
        favorites.delTracks(id);
        break;
      case 'album':
        favorites.delAlbum(id);
        break;
      case 'artist':
        favorites.delArtist(id);
        break;
    }
    return HTTP_CODE.DELETED;
  }
}
