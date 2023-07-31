import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TrackEntity {
  @PrimaryColumn()
  id: string; // uuid v4
  @Column()
  name: string;
  @Column({ nullable: true})
  artistId: string; // refers to Artist
  @Column({ nullable: true})
  albumId?: string; // refers to Album
  @Column()
  duration: number; // integer number
}
