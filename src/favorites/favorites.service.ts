import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { TrackService } from "../track/track.service";
import { AlbumService } from "../album/album.service";
import { HTTP_CODE } from "../utils/util.model";
import { ArtistService } from "../artist/artist.service";
import { TrackEntity } from "../track/entities/track.entity";
import { AlbumEntity } from "../album/entities/album.entity";
import { validate } from "uuid";

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => TrackService)) private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService)) private albumsService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
  ) {}
  async findAll() {
    const tracks = await this.trackService.findFavs();
    const albums = await this.albumsService.findFavs();
    const artists = await this.artistService.findFavs();
    return { tracks, albums, artists };
  }
  async addFavTrack(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const updTrack = await this.trackService.addFavTrack(id);
    return updTrack as TrackEntity;
  }
  async addFavAlbum(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const updAlbum = await this.albumsService.addFavAlbum(id);
    return updAlbum as AlbumEntity;
  }
  async addFavArtist(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const updArtist = await this.artistService.addFavArtist(id);
    return updArtist;
  }
  async delFavTrack(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    await this.trackService.deleteFavTrack(id);
  }
  async delFavAlbum(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    await this.albumsService.deleteFavAlbum(id);
  }
  async delFavArist(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    await this.artistService.deleteFavArtist(id);
  }
  async delete(cmd: string, id: string) {
    switch (cmd) {

      case 'album':
        const album = await this.albumsService.findOne(id);
        if (!album) {
          return HTTP_CODE.UNPROC_CONTENT;
        }
        await this.albumsService.deleteFavAlbum(id);
        return HTTP_CODE.CREATED;
      case 'artist':
        const artist = await this.artistService.findOne(id);
        if (!artist) {
          return HTTP_CODE.UNPROC_CONTENT;
        }
        await this.artistService.deleteFavArtist(id);
        return HTTP_CODE.CREATED;
    }
    return HTTP_CODE.NOT_FOUND;
  }
}
