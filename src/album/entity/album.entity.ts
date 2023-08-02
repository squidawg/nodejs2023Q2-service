import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
