import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TrackEntity {
  @PrimaryColumn()
  id: string; // uuid v4
  @Column()
  name: string;
  @Column()
  artistId?: string; // refers to Artist
  @Column()
  albumId?: string; // refers to Album
  @Column()
  duration: number; // integer number
}
