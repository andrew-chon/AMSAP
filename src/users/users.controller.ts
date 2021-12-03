import { User } from '.prisma/client';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signup(createUserDto);
  }

  @Post('/signin')
  signinUser(@Body() authCredentialDto: AuthCredentialsDto): Promise<User> {
    return this.authService.signin(authCredentialDto);
  }

  @Get('/:id')
  findUser(@Param('id') id: string): Promise<User> {
    return this.usersService.findByUnique({ id });
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUesrDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUesrDto);
  }
}
