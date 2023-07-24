import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { CreatedUser, HTTP_CODE } from './model/users.model';
import { UpdatePasswordModel } from './model/UpdatePasswordModel';
import { validate, v4 } from 'uuid';
@Injectable()
export class UsersRepository {
  async findOne(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const content = await readFile('db.json', 'utf-8');
    const user = JSON.parse(content);
    if (!user[id]) {
      return HTTP_CODE.NOT_FOUND;
    }
    return user[id];
  }
  async findAll() {
    const content = await readFile('db.json', 'utf-8');
    const user = JSON.parse(content);
    return user;
  }
  async create(user: CreatedUser) {
    const content = await readFile('db.json', 'utf-8');
    const users = JSON.parse(content);
    const id = v4();
    const timestampOfCreation = Date.now();
    users[id] = {
      id,
      login: user.login,
      password: user.password,
      version: 0,
      createdAt: timestampOfCreation,
      updatedAt: timestampOfCreation,
    };
    await writeFile('db.json', JSON.stringify(users));
  }
  async update(id: string, content: UpdatePasswordModel) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const contents = await readFile('db.json', 'utf-8');
    const users = JSON.parse(contents);
    const timestampOfUpdate = Date.now();
    if (!users[id]) {
      return HTTP_CODE.NOT_FOUND;
    }
    if (users[id].password !== content.oldPassword) {
      return HTTP_CODE.FORBIDDEN;
    }
    users[id].password = content.newPassword;
    users[id].updatedAt = timestampOfUpdate;
    users[id].version += 1;
    await writeFile('db.json', JSON.stringify(users));
  }
  async delete(id: string) {
    const content = await readFile('db.json', 'utf-8');
    const users = JSON.parse(content);
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    if (!users[id]) {
      return HTTP_CODE.NOT_FOUND;
    }
    delete users[id];
    await writeFile('db.json', JSON.stringify(users));
  }
}
