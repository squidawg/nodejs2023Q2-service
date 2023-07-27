import { Album } from '../src/album/model/album.model';
import { Track } from '../src/track/model/track.model';
import { Artist } from '../src/artist/model/artist.model';
import { User } from '../src/users/model/users.model';
import { v4 } from 'uuid';
export class DataStorage {
  //storage
  private artists: Artist[] = [];
  private users: User[] = [];
  private albums: Album[] = [];
  private tracks: Track[] = [];
  //user route methods
  setUsers(users: User[]) {
    this.users = users;
  }
  setUser(user: User) {
    this.users.push(user);
  }
  get getUsers() {
    return this.users;
  }
  getUserById(id: string) {
    return this.users.find((user: User) => user.id === id);
  }
  removeUser(id: string) {
    const objWithIdIndex = this.users.findIndex((obj) => obj.id === id);

    if (objWithIdIndex > -1) {
      this.users.splice(objWithIdIndex, 1);
    }
  }
  //track route methods
  setTracks(tracks: Track[]) {
    this.tracks = tracks;
  }
  setTrack(track: Track) {
    this.tracks.push(track);
  }
  get getTracks() {
    return this.tracks;
  }
  removeTrack(id: string) {
    const objWithIdIndex = this.tracks.findIndex((obj) => obj.id === id);

    if (objWithIdIndex > -1) {
      this.tracks.splice(objWithIdIndex, 1);
    }
  }
  getTrackById(id: string) {
    return this.tracks.find((track: Track) => track.id === id);
  }
  //artist route methods
  setArtists(artists: Artist[]) {
    this.artists = artists;
  }
  setArtist(artist: Artist) {
    this.artists.push(artist);
  }
  get getArtists() {
    return this.artists;
  }
  getArtistById(id: string) {
    return this.artists.find((artist: Artist) => artist.id === id);
  }
  removeArtist(id: string) {
    const objWithIdIndex = this.artists.findIndex((obj) => obj.id === id);

    if (objWithIdIndex > -1) {
      this.artists.splice(objWithIdIndex, 1);
    }
  }
  //album route methods
  setAlbums(albums: Album[]) {
    this.albums = albums;
  }
  setAlbum(album: Album) {
    this.albums.push(album);
  }
  get getAlbums() {
    return this.albums;
  }
  getAlbumById(id: string) {
    return this.albums.find((album: Album) => album.id === id);
  }
  removeAlbum(id: string) {
    const objWithIdIndex = this.albums.findIndex((obj) => obj.id === id);

    if (objWithIdIndex > -1) {
      this.albums.splice(objWithIdIndex, 1);
    }
  }
  //favs route methods
}

export class UserData implements User {
  createdAt: number;
  id: string;
  login: string;
  password: string;
  updatedAt: number;
  version: number;
  constructor(login: string, password: string) {
    const timestampOfCreation = Date.now();
    this.id = v4();
    this.login = login;
    this.password = password;
    this.createdAt = timestampOfCreation;
    this.updatedAt = timestampOfCreation;
    this.version = 1;
  }
}

export class Favs {
  albums: Album[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
  //fav/album route
  getAlbumById(id: string) {
    return this.albums.find((album) => album.id === id);
  }
  setAlbum(album: Album) {
    if (!album) {
      return;
    }
    this.albums.push(album);
  }
  delAlbum(id: string) {
    const index = this.albums.findIndex((album) => album.id === id);
    this.albums = this.albums.splice(index, 1).filter((odj) => !odj);
  }
  setAlbums(albums: Album[]) {
    this.albums = albums;
  }
  get getAlbums() {
    return this.albums;
  }
  //fav/artist route
  getArtistById(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }
  setArtist(artist: Artist) {
    if (!artist) {
      return;
    }
    this.artists.push(artist);
  }
  delArtist(id: string) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(index, 1).filter((odj) => !odj);
  }
  get getArtists() {
    return this.artists;
  }
  setArtists(artists: Artist[]) {
    this.artists = artists;
  }
  //fav/track route
  setTrack(track: Track) {
    if (!track) {
      return;
    }
    this.tracks.push(track);
  }
  setTracks(tracks: Track[]) {
    this.tracks = tracks;
  }
  get getTracks() {
    return this.tracks;
  }
  delTracks(id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks = this.tracks.splice(index, 1).filter((odj) => !odj);
  }
  getTrackById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }
}
