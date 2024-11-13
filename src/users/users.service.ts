import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seedDatabase(totalSize = 500_000, batchSize = 1000) {
    let count = 0;
    for (const batch of this.generateUser(totalSize, batchSize)) {
      await this.userRepository.save(batch);
      count += batch.length;
      console.log(`Inserted ${count} users`);
    }
    console.log('Datavbase seeding completed');
  }

  private *generateUser(totalSize: number, batchSize: number) {
    let count = 0;
    while (count < totalSize) {
      const batch = [];
      for (let i = 0; i < batchSize && count < totalSize; i++, count++) {
        const user = this.userRepository.create({ status: 'pending' });
        batch.push(user);
      }
      yield batch;
    }
  }
}
