import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: UserModel): Promise<UserModel> {
    return this.userService.createUser(createUser);
  }

  @Get()
  async getAllUser(): Promise<UserModel[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserModel | null> {
    return await this.userService.getUserById(id);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }): Promise<UserModel | null> {
    const { email, password } = loginDto;
    return await this.userService.login(email, password);
  }
}
