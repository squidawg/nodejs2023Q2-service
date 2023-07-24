import { readFile, writeFile } from 'fs/promises';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

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
  async create(user: string) {
    const content = await readFile('db.json', 'utf-8');
    const users = JSON.parse(content);
    const id = crypto.randomBytes(20).toString('hex');
    users[id] = { id, user };
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
