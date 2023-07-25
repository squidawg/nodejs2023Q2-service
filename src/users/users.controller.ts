import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { ERROR_MSG, HTTP_CODE } from './model/users.model';
import { errorHandler, responseHandler } from '../utils/error-handler';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }
  @Get('/:id')
  async getUser(@Param('id') id: string, @Res() response) {
    const user = await this.usersService.findOne(id);
    const err = errorHandler(user, ERROR_MSG.USER_ID);
    return responseHandler(err, response, HTTP_CODE.OK, user);
  }
  @Post()
  createUser(@Body() content: CreateUserDto) {
    return this.usersService.create(content);
  }
  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() content: UpdatePasswordDto,
    @Res() response,
  ) {
    const user = await this.usersService.update(id, content);
    const err = errorHandler(user, ERROR_MSG.USER_ID);
    return responseHandler(err, response, HTTP_CODE.OK, user);
  }
  @Delete('/:id')
  async deleteUser(@Param('id') id: string, @Res() response) {
    const user = await this.usersService.delete(id);
    const err = errorHandler(user, ERROR_MSG.USER_ID);
    return responseHandler(err, response, HTTP_CODE.DELETED);
  }
}
