import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserReq } from './model/users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/users.entity';
import { v4, validate } from 'uuid';
import { HTTP_CODE } from '../utils/util.model';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private repo: Repository<UsersEntity>,
  ) {}
  async findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Entity doesn't exist`);
    }
    return user;
  }
  findAll() {
    return this.repo.find();
  }
  async create(content: CreateUserReq) {
    const timestampOfCreation = Date.now();
    const test = {
      id: v4(),
      login: content.login,
      password: content.password,
      createdAt: timestampOfCreation,
      updatedAt: timestampOfCreation,
      version: 1,
    };
    const user = await this.repo.create(test);
    await this.repo.save(user);
    return test;
  }

  async update(id: string, content: UpdatePasswordDto) {
    if (!validate(id)) {
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    const user = await this.repo.findOne({ where: { id } });
    const timestampOfUpdate = Date.now();
    if (!user) {
      throw new NotFoundException(`Entity doesn't exist`);
    }
    if (user.password !== content.oldPassword) {
      throw new ForbiddenException(`mismatched data`);
    }
    user.password = content.newPassword;
    user.createdAt = parseInt(String(user.createdAt));
    user.updatedAt = timestampOfUpdate;
    user.version += 1;
    await this.repo.save(user);
    return user;
  }
  async delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(`Id is invalid (not uuid)`);
    }
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Entity doesn't exist`);
    }
    Object.assign(user);
    await this.repo.remove(user);
    return HTTP_CODE.DELETED;
  }
}
