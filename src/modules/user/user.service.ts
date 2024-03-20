import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { User, Prisma } from '@prisma/client';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: Prisma.UserCreateInput): Promise<User> {
    const saltOrRounds = 10;
    const passwordHash = await hash(createUserDto.password, saltOrRounds);

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: passwordHash,
      },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    delete user.password;
    
    return user;
  }
}
