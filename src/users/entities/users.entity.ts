import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  login: string;
  @Column()
  password: string;
  @Column({ default: 1 })
  version: number;
  @Column({ type: 'bigint' })
  createdAt: number;
  @Column({ type: 'bigint' })
  updatedAt: number;
}
