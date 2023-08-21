import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity()
export class TrackEntity {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @Expose()
  @Column()
  name: string;
  @Expose()
  @Column({ nullable: true })
  artistId: string; // refers to Artist
  @Expose()
  @Column({ nullable: true })
  albumId?: string; // refers to Album
  @Expose()
  @Column()
  duration: number; // integer number
  @Column('boolean', { default: false })
  isFavourite = false;
}
