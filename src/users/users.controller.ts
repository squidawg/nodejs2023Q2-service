import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/createUser.dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }
  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Post()
  createUser(@Body() content: CreateUserDto) {
    return this.usersService.create(content);
  }
  @Put('/:id')
  updateUser(@Param('id') id: string) {
    return this.usersService.update(id);
  }
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
