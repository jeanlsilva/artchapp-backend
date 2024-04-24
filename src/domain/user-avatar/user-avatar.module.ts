import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAvatarService } from './user-avatar.service';
import { UserAvatarController } from './user-avatar.controller';
import { UserService } from '../user/user.service';
import { UserAvatar } from './entities/user-avatar.entity';
import User from '../user/user.entity';
import UserType from '../user/userType.entity';
import { UserModule } from '../user/user.module';
import UserAddress from '../user-address/entities/user-address.entity';
import { Skill } from '../skill/entities/skill.entity';
import { PurchaseModule } from '../purchase/purchase.module';
import { PackageModule } from '../package/package.module';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { PackageImagesModule } from '../package-images/package-images.module';
import { PortfolioImageModule } from '../portfolio-image/portfolio-image.module';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  controllers: [UserAvatarController],
  providers: [UserAvatarService, UserService],
  imports: [
    TypeOrmModule.forFeature([
      UserAvatar, 
      User, 
      UserType, 
      UserAddress, 
      Skill
    ]), 
    UserModule, 
    PurchaseModule, 
    PackageModule,
    PortfolioModule,
    PackageImagesModule,
    PortfolioImageModule,
    FirebaseModule
  ],
  exports: [UserAvatarService, UserService],
})
export class UserAvatarModule {}
