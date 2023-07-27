import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException
} from "@nestjs/common";
import { ERROR_MSG, HTTP_CODE } from "./util.model";
import { UserResponse } from "../users/model/users.model";
import { Album } from "../album/model/album.model";
import { Track } from "../track/model/track.model";
import { DataStorage, Favs } from "../../fakeDb/db";
import { Artist } from "../artist/model/artist.model";
import { ApiProperty } from "@nestjs/swagger";

export const database = new DataStorage();
export const favorites = new Favs();
export const errorHandler = (
  user: Artist | Track | Album | UserResponse | HTTP_CODE,
  message: ERROR_MSG,
) => {
  switch (user) {
    case HTTP_CODE.BAD_REQUEST:
      return new BadRequestException(`${message} is invalid (not uuid)`);
    case HTTP_CODE.NOT_FOUND:
      return new NotFoundException(`${message} doesn't exist`);
    case HTTP_CODE.FORBIDDEN:
      return new ForbiddenException(`data  is wrong`);
    case HTTP_CODE.UNPROC_CONTENT:
      return new UnprocessableEntityException('UnprocessableEntityException');
  }
};

export function responseHandler(
  err: BadRequestException | NotFoundException | ForbiddenException,
  response,
  status: HTTP_CODE,
  content: Artist | Track | Album | UserResponse | HTTP_CODE | '' = '',
) {
  return err
    ? response.status(err.getStatus()).send(err.getResponse())
    : response.status(status).send(content);
}

export class ErrorResponse {
  @ApiProperty({ example: '4xx' })
  statusCode: number;
  @ApiProperty({ example: 'reason' })
  message: string;
  @ApiProperty({ example: 'error_message' })
  error: string;
}
