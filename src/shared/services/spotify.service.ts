import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SpotifyWebApi from 'spotify-web-api-node';

@Injectable()
export class SpotifyService extends SpotifyWebApi {
  constructor(private configService: ConfigService) {
    super();
    this.setCredentials(this.configService.get('spotify'));
  }
}
