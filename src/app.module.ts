import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { UsersRepository } from './users/users.repository';
import { TrackController } from './track/track.controller';
import { TrackModule } from './track/track.module';
import { TrackRepository } from './track/track.repository';
import { TrackService } from './track/track.service';

@Module({
  imports: [UsersModule, TrackModule],
  controllers: [AppController, UsersController, TrackController],
  providers: [
    AppService,
    UsersService,
    TrackService,
    UsersRepository,
    TrackRepository,
  ],
})
export class AppModule {}
