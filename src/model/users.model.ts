export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
export enum ERROR_MSG {
  USER_ID = 'userId',
  ARTIST_ID = 'artistId',
  TRACK_ID = 'trackId',
}
export enum HTTP_CODE {
  OK = 200,
  DELETED = 204,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

export type CreatedUser = Required<Pick<User, 'login' | 'password'>>;
