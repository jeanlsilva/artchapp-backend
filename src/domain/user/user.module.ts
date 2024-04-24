import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailChimpAdapter } from '../../notifications/adapters/mailchimp.adapter';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import User from './user.entity';
import { FirebaseModule } from '../firebase/firebase.module';
import UserType from './userType.entity';
import UserAddress from '../user-address/entities/user-address.entity';
import { Skill } from '../skill/entities/skill.entity';
import { SearchModule } from '../search/search.module';
import { UserEvents } from './user.events';
import { HttpModule } from '@nestjs/axios';
import { PurchaseService } from '../purchase/purchase.service';
import { PortfolioService } from '../portfolio/portfolio.service';
import { PackageService } from '../package/package.service';
import { PortfolioImagesService } from '../portfolio-image/portfolio-image.service';
import { PackageImagesService } from '../package-images/package-images.service';
import { PurchaseModule } from '../purchase/purchase.module';
import { PackageModule } from '../package/package.module';
import { PackageImagesModule } from '../package-images/package-images.module';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { PortfolioImageModule } from '../portfolio-image/portfolio-image.module';

@Module({
  providers: [
    UserService, 
    UserEvents, 
    MailChimpAdapter,
  ],
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([
      User, 
      UserType, 
      UserAddress, 
      Skill 
    ]), 
    FirebaseModule,
    PurchaseModule,
    SearchModule, 
    HttpModule,
    PurchaseModule,
    PackageModule,
    PackageImagesModule,
    PortfolioModule,
    PortfolioImageModule
],
  exports: [UserService, UserEvents, MailChimpAdapter],
})
export class UserModule {}
