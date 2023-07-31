import { Injectable } from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { CreateArtistDto } from './dto/CreateArtistDto';

@Injectable()
export class ArtistService {
  constructor(private artistRepository: ArtistRepository) {}
  findOne(id: string) {
    return this.artistRepository.finOne(id);
  }
  findAll() {
    return this.artistRepository.findAll();
  }
  create(content: CreateArtistDto) {
    return this.artistRepository.create(content);
  }
  update(id: string, content: CreateArtistDto) {
    return this.artistRepository.update(id, content);
  }
  delete(id: string) {
    return this.artistRepository.delete(id);
  }
}
