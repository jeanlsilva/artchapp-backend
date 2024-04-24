import { TemplateContent } from '../types/mailchimp.interface';

interface MailchimpGenericTemplateInterface {
  title: string;
  section_title: string;
  section_content: string;
  button_text: string;
  button_link: string;
  payment_title?: string;
  payment_content?: string;
}

interface MailchimpEstimateTemplateInterface {
  title: string;
  section_title: string;
  section_content: string;
  button_text: string;
  button_link: string;
  estimate_title: string;
  estimate_content: string;
}

export class MailchimpTemplate {
  genericTemplate: MailchimpGenericTemplateInterface;

  constructor(genericTemplate: MailchimpGenericTemplateInterface) {
    this.genericTemplate = genericTemplate;
  }

  getGenericTemplate(): TemplateContent[] {
    return [
      {
        name: 'title',
        content: this.genericTemplate.title,
      },
      {
        name: 'section_title',
        content: this.genericTemplate.section_title,
      },
      {
        name: 'section_content',
        content: this.genericTemplate.section_content,
      },
      {
        name: 'button_text',
        content: this.genericTemplate.button_text,
      },
      {
        name: 'button_link',
        content: this.genericTemplate.button_link,
      },
    ];
  }
}

export class MailchimpTemplateEstimate {
  estimateTemplate: MailchimpEstimateTemplateInterface;

  constructor(estimateTemplate: MailchimpEstimateTemplateInterface) {
    this.estimateTemplate = estimateTemplate;
  }

  getEstimateTemplate(): TemplateContent[] {
    return [
      {
        name: 'title',
        content: this.estimateTemplate.title,
      },
      {
        name: 'section_title',
        content: this.estimateTemplate.section_title,
      },
      {
        name: 'section_content',
        content: this.estimateTemplate.section_content,
      },
      {
        name: 'button_text',
        content: this.estimateTemplate.button_text,
      },
      {
        name: 'button_link',
        content: this.estimateTemplate.button_link,
      },
      {
        name: 'payment_title',
        content: this.estimateTemplate.estimate_title,
      },
      {
        name: 'es_content',
        content: this.estimateTemplate.estimate_content,
      },
    ];
  }
}
