import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dtos/createUser.dto';
import { ResponseCreateUserDTO } from './dtos/responseCreateUser.dto';
import { ResponseGetAllUserDTO } from './dtos/responseGetAllUser.dto';
import { GetAllUserDTO } from './dtos/getAllUser.dto';
import { LoginUserDTO } from './dtos/loginUser.dto';
import { ResponseLoginUserDTO } from './dtos/responseLogin.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @ApiResponse({ type: ResponseCreateUserDTO, description: 'user' })
  @ApiBody({ type: CreateUserDTO })
  async createUser(@Body() createUser: UserModel): Promise<UserModel | null> {
    return this.userService.createUser(createUser);
  }

  @Get()
  @ApiResponse({ type: ResponseGetAllUserDTO, description: 'user' })
  @ApiBody({ type: GetAllUserDTO })
  async getAllUser(): Promise<UserModel[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  @ApiResponse({ type: CreateUserDTO, description: 'user' })
  @ApiParam({ name: 'id', example: '1' })
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserModel | null> {
    return await this.userService.getUserById(id);
  }

  @Post('login')
  @ApiResponse({ type: ResponseLoginUserDTO, description: 'user' })
  @ApiBody({ type: LoginUserDTO })
  async login(@Body() loginDto: LoginUserDTO): Promise<UserModel | null> {
    const { email, password } = loginDto;
    return await this.userService.login(email, password);
  }
}
