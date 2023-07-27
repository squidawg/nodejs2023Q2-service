import { Artist } from '../../artist/model/artist.model';
import { Album } from '../../album/model/album.model';
import { Track } from '../../track/model/track.model';

export interface Favorites {
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}
