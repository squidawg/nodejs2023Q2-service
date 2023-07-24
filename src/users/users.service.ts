import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreatedUser } from '../model/users.model';
import { UpdatePasswordModel } from "../model/UpdatePasswordModel";

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }
  findAll() {
    return this.usersRepository.findAll();
  }
  create(content: CreatedUser) {
    return this.usersRepository.create(content);
  }
  update(id: string, content: UpdatePasswordModel) {
    return this.usersRepository.update(id, content);
  }
  delete(id: string) {
    return this.usersRepository.delete(id);
  }
}
