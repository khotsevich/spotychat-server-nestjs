import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SpotifyService } from 'src/shared/services/spotify.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    private spotifyService: SpotifyService,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(code: string): Promise<{ accessToken: string }> {
    const authData = await this.spotifyService.authorizationCodeGrant(code);
    const { access_token, refresh_token } = authData.body;

    this.spotifyService.setAccessToken(access_token);
    const profileData = await this.spotifyService.getMe();

    const { id, email, display_name, images } = profileData.body;

    const authCredentials: AuthCredentialsDto = {
      accessToken: access_token,
      refreshToken: refresh_token,
      spotifyId: id,
      email,
      name: display_name,
      avatar: images[0]?.url,
    };

    const spotifyId = await this.userRepository.login(authCredentials);
    const payload: JwtPayload = { spotifyId };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
