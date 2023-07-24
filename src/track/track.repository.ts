import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Track } from './model/track.model';
@Injectable()
export class TrackRepository {
  async findAll() {
    const content = await readFile('track.db.json', 'utf-8');
    const track = JSON.parse(content);
    return track;
  }
  async findOne(id: string) {
    const content = await readFile('track.db.json', 'utf-8');
    const track = JSON.parse(content);
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
    const contents = await readFile('track.db.json', 'utf-8');
    const tracks = JSON.parse(contents);
    tracks[id] = { id, ...content };
    await writeFile('track.db.json', JSON.stringify(tracks));
  }
  async delete(id: string) {
    const contents = await readFile('track.db.json', 'utf-8');
    const tracks = JSON.parse(contents);
    delete tracks[id];
    await writeFile('track.db.json', JSON.stringify(tracks));
  }
}
