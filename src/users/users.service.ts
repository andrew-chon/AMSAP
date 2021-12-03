import { User } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';

interface UniqueIdentifiers {
  id?: string;
  email?: string;
}
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({ data: createUserDto });

    return user;
  }

  async findByUnique(identifier: UniqueIdentifiers): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: identifier,
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    return user;
  }
}
