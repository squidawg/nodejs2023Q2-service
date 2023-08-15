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
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { UserData } from './model/users.model';
import { Serialize } from '../interceptors/serialize';
import {
  ApiDelete,
  ApiGet,
  ApiGetById,
  ApiPost,
  ApiPut,
  ErrorResponse,
} from '../utils/decorator.service';
@ApiTags('User Api')
@Serialize(UserData)
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiGet(UserData)
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }
  @ApiGetById(UserData)
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }
  @ApiPost(UserData)
  @Post()
  async createUser(@Body() content: CreateUserDto) {
    return await this.usersService.create(content);
  }
  @ApiPut(UserData)
  @ApiForbiddenResponse({
    description: 'oldPassword is wrong',
    type: ErrorResponse,
  })
  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() content: UpdatePasswordDto,
  ) {
    return await this.usersService.update(id, content);
  }
  @ApiDelete()
  @Delete('/:id')
  async deleteUser(@Param('id') id: string, @Res() response) {
    const user = await this.usersService.delete(id);
    return response.status(user).send();
  }
}
