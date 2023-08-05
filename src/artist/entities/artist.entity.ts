import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class ArtistEntity {
  @PrimaryColumn()
  id: string; // uuid v4
  @Column()
  name: string;
  @Column()
  grammy: boolean;
  @Exclude()
  @Column('boolean', { default: false })
  isFavourite = false;
}
