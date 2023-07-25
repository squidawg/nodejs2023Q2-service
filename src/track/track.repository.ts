import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { validate, v4 } from 'uuid';
import { Track } from './model/track.model';
import { HTTP_CODE } from '../users/model/users.model';
@Injectable()
export class TrackRepository {
  async findAll() {
    const content = await readFile('track.db.json', 'utf-8');
    const track = JSON.parse(content);
    return track;
  }
  async findOne(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const content = await readFile('track.db.json', 'utf-8');
    const track = JSON.parse(content);
    if (!track[id]) {
      return HTTP_CODE.NOT_FOUND;
    }
    return track[id];
  }
  async create(track: Track) {
    const content = await readFile('track.db.json', 'utf-8');
    const tracks = JSON.parse(content);
    const id = v4();
    tracks[id] = {
      id,
      ...track,
    };
    await writeFile('track.db.json', JSON.stringify(tracks));
  }
  async update(id: string, content: Track) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const contents = await readFile('track.db.json', 'utf-8');
    const tracks = JSON.parse(contents);
    if (!tracks[id]) {
      return HTTP_CODE.NOT_FOUND;
    }
    tracks[id] = { id, ...content };
    await writeFile('track.db.json', JSON.stringify(tracks));
  }
  async delete(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const contents = await readFile('track.db.json', 'utf-8');
    const tracks = JSON.parse(contents);
    if (!tracks[id]) {
      return HTTP_CODE.NOT_FOUND;
    }
    delete tracks[id];
    await writeFile('track.db.json', JSON.stringify(tracks));
  }
}
