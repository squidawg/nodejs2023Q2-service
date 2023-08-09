import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class AlbumEntity {
  @PrimaryColumn()
  id: string; // uuid v4
  @Column()
  name: string;
  @Column()
  year: number;
  @Column({ nullable: true })
  artistId: string; // refers to Artist
  @Exclude()
  @Column('boolean', { default: false })
  isFavourite = false;
}
