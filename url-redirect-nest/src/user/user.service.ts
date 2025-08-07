import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(email: string, password: string) {
    const isEmailExists = await this.userRepository.findByEmail(email);

    if (isEmailExists) {
      throw new BadRequestException('Email already exists');
    }

    const user = await this.userRepository.save(email, password);
    return user;
  }
}
