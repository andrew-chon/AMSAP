import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import * as argon2 from 'argon2';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { User } from '.prisma/client';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const hashedPassword: string = await argon2.hash(password, {
      type: argon2.argon2id,
    });
    createUserDto.password = hashedPassword;
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  async signin(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersService.findByUnique({ email });
    const hashedPassword = user.password;

    if (!(await argon2.verify(hashedPassword, password))) {
      throw new UnauthorizedException('Incorrect Credentials');
    }
    return user;
  }
}
