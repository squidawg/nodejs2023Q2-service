import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }
  findAll() {
    return this.usersRepository.findAll();
  }
  create(content: string) {
    return this.usersRepository.create(content);
  }
  update(id: string) {
    return this.usersRepository.update(id);
  }
  delete(id: string) {
    return this.usersRepository.delete(id);
  }
}
