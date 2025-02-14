import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserDocument } from 'src/schemas/user.schema';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: any): Promise<User> {
    return this.userService.createUsers(createUserDto);
  }
  @Get()
  getall(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @Get(':email')
  getUserByEmail(@Param('email') userEmail: string): Promise<UserDocument | null> {
    return this.userService.getUserByEmail(userEmail);
  }
}
