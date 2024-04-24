import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import User from '../user/user.entity';
import UserAddress from '../user-address/entities/user-address.entity';
import { Package } from '../package/entities/package.entity';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [TypeOrmModule.forFeature([User, UserAddress, Package])],
  exports: [SearchService],
})
export class SearchModule {}
