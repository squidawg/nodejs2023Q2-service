import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity()
export class UsersEntity {
  @PrimaryColumn()
  id: string; // uuid v4
  @Column()
  login: string;
  @Column()
  password: string;
  @Column()
  version: number; // integer number, increments on update
  @Column({ type: 'bigint' })
  createdAt: number; // timestamp of creation
  @Column({ type: 'bigint' })
  updatedAt: number; // timestamp of last update
}
