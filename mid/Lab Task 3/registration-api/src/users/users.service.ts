import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async register(dto: CreateUserDto) {
    const exists = await this.repo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email already registered');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.repo.save(this.repo.create({ ...dto, password: hashed }));

    return {
      message: 'User registered successfully',
      user: {
        fullName: user.fullName,
        email: user.email,
        age: user.age,
        accountType: user.accountType,
      },
    };
  }
}