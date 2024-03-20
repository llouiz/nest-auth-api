import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CacheModule } from './modules/cache/cache.module';

@Module({
  imports: [UserModule, CacheModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
