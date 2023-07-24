import { IsNotEmpty, IsString, IsNumber, IsEmpty } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsEmpty()
  artistId: string | null;
  @IsString()
  @IsEmpty()
  albumId: string | null;
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
