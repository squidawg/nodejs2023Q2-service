import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity()
export class ArtistEntity {
  @Expose()
  @PrimaryColumn()
  id: string; // uuid v4
  @Expose()
  @Column()
  name: string;
  @Expose()
  @Column()
  grammy: boolean;
  @Column('boolean', { default: false })
  isFavourite = false;
}
