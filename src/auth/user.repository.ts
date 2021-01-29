import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async login(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const {
      accessToken,
      refreshToken,
      spotifyId,
      email,
      name,
      avatar,
    } = authCredentialsDto;

    let user = await this.findOne({ spotifyId });

    if (!user) {
      user = new User();
    }

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.spotifyId = spotifyId;
    user.email = email;
    user.name = name;
    user.avatar = avatar ? avatar : '';

    try {
      await user.save();
      return user.spotifyId;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
