import { User } from '.prisma/client';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get('/:id')
  findUser(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUesrDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUesrDto);
  }
}
