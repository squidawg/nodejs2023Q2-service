import { Injectable } from '@nestjs/common';
import { validate, v4 } from 'uuid';
import { Track } from './model/track.model';
import { HTTP_CODE } from '../utils/util.model';
import { database } from '../utils/helpers';

@Injectable()
export class TrackRepository {
  async findAll() {
    return database.getTracks;
  }
  async findOne(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const track = database.getTrackById(id);
    if (!track) {
      return HTTP_CODE.NOT_FOUND;
    }
    return track;
  }
  async create(track: Track) {
    const id = v4();
    const newTrack: Track = {
      id,
      ...track,
    };
    database.setTrack(newTrack);
    return newTrack;
  }
  async update(id: string, content: Track) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const trackData = database.getTrackById(id);
    if (!trackData) {
      return HTTP_CODE.NOT_FOUND;
    }
    const UpdatedTrack = { id, ...content };
    const updatedTracks = database.getTracks.map((track) =>
      track.id === UpdatedTrack.id ? UpdatedTrack : track,
    );
    database.setTracks(updatedTracks);
    return UpdatedTrack;
  }
  async delete(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const tracks = database.getTrackById(id);
    if (!tracks) {
      return HTTP_CODE.NOT_FOUND;
    }
    database.removeTrack(id);
  }
}
