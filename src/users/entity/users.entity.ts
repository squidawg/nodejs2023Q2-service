import { Column, PrimaryColumn } from 'typeorm';

export class User {
  @PrimaryColumn()
  id: string; // uuid v4
  @Column()
  login: string;
  @Column()
  password: string;
  @Column()
  version: number; // integer number, increments on update
  @Column()
  createdAt: number; // timestamp of creation
  @Column()
  updatedAt: number; // timestamp of last update
}
