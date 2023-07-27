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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { errorHandler, ErrorResponse, responseHandler } from '../utils/helpers';
import { ERROR_MSG, HTTP_CODE } from '../utils/util.model';
import { UserData, UserResponse } from './model/users.model';
@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiOperation({ summary: 'Get all Users' })
  @ApiOkResponse({
    description: 'Get all records',
    type: [UserData],
  })
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }
  @ApiOperation({ summary: 'Get User' })
  @ApiOkResponse({
    description: 'Get record',
    type: UserData,
  })
  @ApiBadRequestResponse({
    description: 'TrackId is invalid (not uuid)',
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    description: "Record with id === trackId doesn't exist",
    type: ErrorResponse,
  })
  @Get('/:id')
  async getUser(@Param('id') id: string, @Res() response) {
    const user = await this.usersService.findOne(id);
    const err = errorHandler(user, ERROR_MSG.USER_ID);
    return responseHandler(err, response, HTTP_CODE.OK, user);
  }
  @ApiOperation({ summary: 'Add User' })
  @ApiCreatedResponse({ description: 'Get record', type: UserResponse })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
    type: ErrorResponse,
  })
  @Post()
  async createUser(@Body() content: CreateUserDto, @Res() response) {
    const user = await this.usersService.create(content);
    const err = errorHandler(user, ERROR_MSG.USER_ID);
    return responseHandler(err, response, HTTP_CODE.CREATED, user);
  }
  @ApiOperation({ summary: 'Update User' })
  @ApiOkResponse({
    description: 'Updated record',
    type: UserData,
  })
  @ApiBadRequestResponse({
    description: 'TrackId is invalid (not uuid)',
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    description: "Record with id === trackId doesn't exist",
    type: ErrorResponse,
  })
  @ApiForbiddenResponse({
    description: 'oldPassword is wrong',
    type: ErrorResponse,
  })
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
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({
    status: 204,
    description: 'User deleted, no return content',
  })
  @ApiBadRequestResponse({
    description: 'TrackId is invalid (not uuid)',
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    description: "Record with id === trackId doesn't exist",
    type: ErrorResponse,
  })
  @Delete('/:id')
  async deleteUser(@Param('id') id: string, @Res() response) {
    const user = await this.usersService.delete(id);
    const err = errorHandler(user, ERROR_MSG.USER_ID);
    return responseHandler(err, response, HTTP_CODE.DELETED);
  }
}
