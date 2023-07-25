import { Injectable } from '@nestjs/common';
import { AlbumRepository } from './album.repository';
import { CreateAlbumDto } from './dto/CreateAlbumDto';

@Injectable()
export class AlbumService {
  constructor(private albumRepository: AlbumRepository) {}
  findAll() {
    return this.albumRepository.findAll();
  }
  findOne(id: string) {
    return this.albumRepository.finOne(id);
  }
  create(content: CreateAlbumDto) {
    return this.albumRepository.create(content);
  }
  update(id: string, content: CreateAlbumDto) {
    return this.albumRepository.update(id, content);
  }
  delete(id: string) {
    return this.albumRepository.delete(id);
  }
}
