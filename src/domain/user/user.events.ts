import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailchimpTemplate } from '../../notifications/classes/mailchimp.class';
import { MailChimpAdapter, MailchimpTemplateEnum } from '../../notifications/adapters/mailchimp.adapter';
import { UserBaseDTO } from './userBaseDTO';

export enum UserEventsEnum {
  CREATED = 'user.created',
}

const templateUser = new MailchimpTemplate({
  title: 'Conta criada com sucesso',
  section_title: 'Nova conta no ArtchApp',
  section_content: `Bem vindo ao ArtchApp, acesse o aplicativo para completar seu cadastro.`,
  button_text: 'Acessar o app',
  button_link: '',
});

@Injectable()
export class UserEvents {
  constructor(private readonly mailChimpAdapter: MailChimpAdapter) {}
  @OnEvent(UserEventsEnum.CREATED, { async: true })
  async handleUserCreatedEvent(user: UserBaseDTO): Promise<void> {
    if (!user.email) {
      return;
    }
    this.mailChimpAdapter.sendEmail({
      templateName: MailchimpTemplateEnum.GENERIC,
      content: templateUser.getGenericTemplate(),
      emailTo: user.email,
      subject: 'Parabéns, nova conta criada no ArtchApp',
    });
  }
}
