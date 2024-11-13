import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ProcessUsersJob } from './process-users.job';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'cron-jobs' }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService, ProcessUsersJob],
})
export class UsersModule {}
