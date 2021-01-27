import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { SpotifyService } from 'src/shared/services/spotify.service';

@Injectable()
export class UsersService {
  constructor(private spotifyService: SpotifyService) {}

  async getProfile(user: User) {
    this.spotifyService.setAccessToken(user.accessToken);
    const tracksData = await this.spotifyService.getMySavedTracks();
    const tracks = tracksData.body.items.map((item) => {
      const { artists, name } = item.track;
      return `${artists.map((a) => a.name).join(', ')} - ${name}`;
    });

    const playlistsData = await this.spotifyService.getMySavedAlbums();
    const playlists = playlistsData.body.items.map((item) => {
      const { images } = item.album;
      return images[0];
    });

    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      tracks,
      playlists,
    };
  }
}
