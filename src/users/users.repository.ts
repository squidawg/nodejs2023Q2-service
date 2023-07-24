import { readFile, writeFile } from 'fs/promises';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { User } from "../model/users.model";

@Injectable()
export class UsersRepository {
  async findOne(id: string) {
    const content = await readFile('db.json', 'utf-8');
    const user = JSON.parse(content);
    return user[id];
  }
  async findAll() {
    const content = await readFile('db.json', 'utf-8');
    const user = JSON.parse(content);
    return user;
  }
  async create(user: { login: string; password: string }) {
    const content = await readFile('db.json', 'utf-8');
    const users = JSON.parse(content);
    const id = crypto.randomBytes(20).toString('hex');
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
  update(id: string) {
    //const content = await readFile('db.json', 'utf-8');
    console.log('updatesd_user');
  }
  async delete(id: string) {
    const content = await readFile('db.json', 'utf-8');
    const users = JSON.parse(content);
    delete users[id];
    await writeFile('db.json', JSON.stringify(users));
  }
}
