import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailchimpTemplate, MailchimpTemplateEstimate } from '../../notifications/classes/mailchimp.class';
import { MailChimpAdapter, MailchimpTemplateEnum } from '../../notifications/adapters/mailchimp.adapter';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

export enum PurchaseEventsEnum {
  CREATED = 'purchase.created',
}

const templatePayment = new MailchimpTemplate({
  title: 'Compra efetuada com sucesso!',
  section_title: 'Nova compra no ArtchApp',
  section_content: `Obrigado por comprar na ArtchApp.`,
  button_text: 'Acessar o app',
  button_link: '',
});

const templateEstimate = new MailchimpTemplateEstimate({
  title: 'Orçamento enviado com sucesso!',
  section_title: 'Novo orçamento no ArtchApp',
  section_content: `Obrigado por fazer um orçamento com o ArtchApp, entre em seu perfil e finalize a compra.`,
  button_text: 'Acessar o app',
  button_link: '',
  estimate_content: '',
  estimate_title: '',
});

@Injectable()
export class PurchaseEvents {
  constructor(private readonly mailChimpAdapter: MailChimpAdapter) {}
  @OnEvent(PurchaseEventsEnum.CREATED, { async: true })
  async handleUserCreatedEvent(purchase: CreatePurchaseDto): Promise<void> {
    if (purchase.finished === true) {
      this.mailChimpAdapter.sendEmail({
        templateName: MailchimpTemplateEnum.GENERIC,
        content: templatePayment.getGenericTemplate(),
        emailTo: purchase.user.email,
        subject: 'Congratulations, new purchase made on Artchapp!',
      });
    }
    if (purchase.finished === false) {
      this.mailChimpAdapter.sendEmail({
        templateName: MailchimpTemplateEnum.ESTIMATE,
        content: templateEstimate.getEstimateTemplate(),
        emailTo: purchase.user.email,
        subject: 'Congratulations, new price quote made on Artchapp!',
      });
    }
  }
}
