import { ERROR_MSG, HTTP_CODE } from '../model/users.model';
import {
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

export const errorHandler = (user: HTTP_CODE, message: ERROR_MSG) => {
  switch (user) {
    case HTTP_CODE.BAD_REQUEST:
      return new BadRequestException(`${message} is invalid (not uuid)`);
    case HTTP_CODE.NOT_FOUND:
      return new NotFoundException(`${message} doesn't exist`);
    case HTTP_CODE.FORBIDDEN:
      return new ForbiddenException(`data  is wrong`);
  }
};
