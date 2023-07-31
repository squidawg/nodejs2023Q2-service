import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ArtistEntity {
  @PrimaryColumn()
  id: string; // uuid v4
  @Column()
  name: string;
  @Column()
  grammy: boolean;
}
