import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity()
export class AlbumEntity {
  @Expose()
  @PrimaryColumn()
  id: string; // uuid v4
  @Expose()
  @Column()
  name: string;
  @Expose()
  @Column()
  year: number;
  @Expose()
  @Column({ nullable: true })
  artistId: string; // refers to Artist
  @Column('boolean', { default: false })
  isFavourite = false;
}
