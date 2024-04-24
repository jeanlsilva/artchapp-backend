import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MailChimpAdapter } from './adapters/mailchimp.adapter';

@Module({
  providers: [MailChimpAdapter],
  imports: [HttpModule],
  exports: [MailChimpAdapter],
})
export class NotificationsModule {}
