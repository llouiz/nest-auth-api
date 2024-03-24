import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/database/prisma.service';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [CacheModule], 
  controllers: [UserController],
  providers: [UserService, PrismaService],
  })
export class UserModule {}
