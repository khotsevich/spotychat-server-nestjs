import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SpotifyService } from 'src/shared/services/spotify.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService, SpotifyService],
})
export class UsersModule {}
