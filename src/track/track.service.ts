import { Injectable } from '@nestjs/common';
import { TrackRepository } from './track.repository';
import { Track } from './model/track.model';

@Injectable()
export class TrackService {
  constructor(private trackRepository: TrackRepository) {}
  findOne(id: string) {
    return this.trackRepository.findOne(id);
  }
  findAll() {
    return this.trackRepository.findAll();
  }
  create(content: Track) {
    return this.trackRepository.create(content);
  }
  update(id: string, content: Track) {
    return this.trackRepository.update(id, content);
  }
  delete(id: string) {
    return this.trackRepository.delete(id);
  }
}
