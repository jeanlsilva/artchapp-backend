import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PackageTagsModule } from 'src/domain/package-tags/package-tags.module';
import { PortfolioTagsModule } from 'src/domain/portfolio-tags/portfolio-tags.module';
import { PortfolioImageModule } from 'src/domain/portfolio-image/portfolio-image.module';
import { ServiceTagsModule } from './src/domain/service-tags/service-tags.module';
import { SearchModule } from './src/domain/search/search.module';
import { UserAvatarModule } from './src/domain/user-avatar/user-avatar.module';
import { PortfolioModule } from './src/domain/portfolio/portfolio.module';
import { PackageModule } from './src/domain/package/package.module';
import { BoardModule } from './src/domain/board/board.module';
import { ServiceImagesModule } from './src/domain/service-images/service-images.module';
import { PackageImagesModule } from './src/domain/package-images/package-images.module';
import { PurchaseModule } from './src/domain/purchase/purchase.module';
import { FirebaseModule } from './src/domain/firebase/firebase.module';
import { UserAddressModule } from './src/domain/user-address/user-address.module';
import { ServiceModule } from './src/domain/service/service.module';
import { SkillModule } from './src/domain/skill/skill.module';
import { SpecialtyModule } from './src/domain/specialty/specialty.module';
import { AuthModule } from './src/domain/auth/auth.module';
import { UserModule } from './src/domain/user/user.module';
import { DatabaseModule } from './src/database/database.module';
import { NotificationsModule } from './src/notifications/notifications.module';
import { StripeModule } from './src/stripe/stripe.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    AuthModule,
    FirebaseModule,
    UserAddressModule,
    UserModule,
    BoardModule,
    SpecialtyModule,
    PortfolioModule,
    PortfolioImageModule,
    ServiceModule,
    PackageModule,
    SkillModule,
    PurchaseModule,
    PackageImagesModule,
    ServiceImagesModule,
    SearchModule,
    UserAvatarModule,
    ServiceTagsModule,
    PackageTagsModule,
    PortfolioTagsModule,
    NotificationsModule,
    StripeModule,
  ],
})
export class AppModule {}
