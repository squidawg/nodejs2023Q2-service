import { Injectable } from "@nestjs/common";
import { FavoritesRepository } from "./favorites.repository";

@Injectable()
export class FavoritesService {
  constructor(private favoritesRepository: FavoritesRepository) {}
  findAll() {
    return this.favoritesRepository.findAll();
  }
  create(cmd: string, id: string) {
    return this.favoritesRepository.create(cmd, id);
  }
  delete(cmd: string, id: string) {
    return this.favoritesRepository.delete(cmd, id);
  }
}
