import { readFile, writeFile } from "fs/promises";
import * as crypto from "crypto";
import { Injectable } from "@nestjs/common";
import { CreatedUser, User } from "../model/users.model";
import { UpdatePasswordModel } from "../model/UpdatePasswordModel";

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
  async create(user: CreatedUser) {
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
  async update(id: string, content: UpdatePasswordModel) {
    const contents = await readFile('db.json', 'utf-8');
    const users = JSON.parse(contents);
    const timestampOfUpdate = Date.now();
    if (users[id].password !== content.oldPassword) {
      return;
    }
    users[id].password = content.newPassword;
    users[id].updatedAt = timestampOfUpdate;
    users[id].version += 1;
    await writeFile('db.json', JSON.stringify(users));
  }
  async delete(id: string) {
    const content = await readFile('db.json', 'utf-8');
    const users = JSON.parse(content);
    delete users[id];
    await writeFile('db.json', JSON.stringify(users));
  }
}
