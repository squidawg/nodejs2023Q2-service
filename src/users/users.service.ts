import { Injectable } from '@nestjs/common';
import { CreateUserReq, CreateUserRes, User, UserData } from "./model/users.model";
import { UpdatePasswordModel } from './model/UpdatePasswordModel';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/users.entity';
import { v4, validate } from 'uuid';
import { HTTP_CODE } from '../utils/util.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private repo: Repository<UsersEntity>,
  ) {}
  async findOne(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      return HTTP_CODE.NOT_FOUND;
    }
    return user;
  }
  findAll() {
    return this.repo.find();
  }
  async create(content: CreateUserReq) {
    const timestampOfCreation = Date.now();
    const test: User = {
      id: v4(),
      login: content.login,
      password: content.password,
      createdAt: timestampOfCreation,
      updatedAt: timestampOfCreation,
      version: 1,
    };
    const user = await this.repo.create(test);
    await this.repo.save(user);
    const { password, ...response } = test;
    return response as CreateUserRes;
  }
  async update(id: string, content: UpdatePasswordModel) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const user = await this.repo.findOne({ where: { id } });
    const timestampOfUpdate = Date.now();
    if (!user) {
      return HTTP_CODE.NOT_FOUND;
    }
    if (user.password !== content.oldPassword) {
      return HTTP_CODE.FORBIDDEN;
    }
    user.password = content.newPassword;
    user.createdAt = parseInt(String(user.createdAt));
    user.updatedAt = timestampOfUpdate;
    user.version += 1;
    const { password, ...response } = user;
    await this.repo.save(user);
    return response as CreateUserRes;
  }
  async delete(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      return HTTP_CODE.NOT_FOUND;
    }
    Object.assign(user);
    await this.repo.remove(user);
    return HTTP_CODE.DELETED;
  }
}
