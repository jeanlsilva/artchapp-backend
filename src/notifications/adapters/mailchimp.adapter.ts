import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { MailChimpInterface, TemplateContent } from '../types/mailchimp.interface';

export enum MailchimpTemplateEnum {
  GENERIC = 'generic',
  ESTIMATE = 'estimate',
}

interface SendEmailInterface {
  templateName: MailchimpTemplateEnum;
  subject: string;
  emailTo: string;
  content: TemplateContent[];
}

@Injectable()
export class MailChimpAdapter {
  constructor(private httpService: HttpService) {}

  async sendEmail(data: SendEmailInterface) {
    const body: MailChimpInterface = {
      key: 'v3RK5EBQtGTpLMUr9iHHpQ',
      template_name: data.templateName,
      template_content: [],
      message: {
        html: '',
        text: '',
        subject: data.subject,
        from_email: 'jean.silva@penseapp.com.br',
        from_name: 'ArtchApp',
        to: [{ email: data.emailTo, type: 'to' }],
        headers: {},
        important: false,
        track_opens: false,
        track_clicks: false,
        auto_text: false,
        auto_html: false,
        inline_css: false,
        url_strip_qs: false,
        preserve_recipients: false,
        view_content_link: false,
        bcc_address: '',
        tracking_domain: '',
        signing_domain: '',
        return_path_domain: '',
        merge: false,
        merge_language: 'mailchimp',
        global_merge_vars: data.content,
        merge_vars: [],
        tags: [],
        subaccount: 'teste',
        google_analytics_domains: [],
        google_analytics_campaign: '',
        metadata: { website: '' },
        recipient_metadata: [],
        attachments: [],
        images: [],
      },
      async: false,
      ip_pool: '',
      send_at: '',
    };
    try {
      await this.httpService.post('https://mandrillapp.com/api/1.0/messages/send-template', body).toPromise();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}
