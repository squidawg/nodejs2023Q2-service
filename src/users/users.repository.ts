import { Injectable } from '@nestjs/common';
import { CreateUserReq, UserData, CreateUserRes } from './model/users.model';
import { UpdatePasswordModel } from './model/UpdatePasswordModel';
import { validate } from 'uuid';
import { HTTP_CODE } from '../utils/util.model';
import { database } from '../utils/helpers';
@Injectable()
export class UsersRepository {
  async findOne(id: string) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const user = database.getUserById(id);
    if (!user) {
      return HTTP_CODE.NOT_FOUND;
    }
    return user;
  }
  async findAll() {
    return database.getUsers;
  }
  create(user: CreateUserReq) {
    const newUser = new UserData(user.login, user.password);
    database.setUser(newUser);
    const { password, ...response } = newUser;
    return response as CreateUserRes;
  }
  async update(id: string, content: UpdatePasswordModel) {
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    const userData = database.getUserById(id);
    const timestampOfUpdate = Date.now();
    if (!userData) {
      return HTTP_CODE.NOT_FOUND;
    }
    if (userData.password !== content.oldPassword) {
      return HTTP_CODE.FORBIDDEN;
    }
    userData.password = content.newPassword;
    userData.updatedAt = timestampOfUpdate;
    userData.version += 1;
    const { password, ...response } = userData;
    const updatedUsers = database.getUsers.map((user) =>
      user.id === userData.id ? userData : user,
    );
    database.setUsers(updatedUsers);
    return response as CreateUserRes;
  }
  async delete(id: string) {
    const users = database.getUserById(id);
    if (!validate(id)) {
      return HTTP_CODE.BAD_REQUEST;
    }
    if (!users) {
      return HTTP_CODE.NOT_FOUND;
    }
    database.removeUser(id);
  }
}
