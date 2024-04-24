import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { Purchase } from './entities/purchase.entity';
import { PurchaseEvents } from './purchase.events';
import { MailChimpAdapter } from '../../notifications/adapters/mailchimp.adapter';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService, PurchaseEvents, MailChimpAdapter],
  imports: [TypeOrmModule.forFeature([Purchase]), HttpModule],
  exports: [PurchaseService, PurchaseEvents, MailChimpAdapter],
})
export class PurchaseModule {}
