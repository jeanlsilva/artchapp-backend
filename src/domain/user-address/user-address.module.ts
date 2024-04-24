import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserAddressService from './user-address.service';
import { UserAddressController } from './user-address.controller';
import UserAddress from './entities/user-address.entity';

@Module({
  controllers: [UserAddressController],
  providers: [UserAddressService],
  imports: [TypeOrmModule.forFeature([UserAddress])],
  exports: [UserAddressService],
})
export class UserAddressModule {}
