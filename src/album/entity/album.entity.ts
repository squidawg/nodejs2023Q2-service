import { Column, PrimaryColumn } from 'typeorm';

export class Album {
  @PrimaryColumn()
  id: string; // uuid v4
  @Column()
  name: string;
  @Column()
  year: number;
  @Column()
  artistId?: string; // refers to Artist
}
