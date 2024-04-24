import { Injectable } from '@nestjs/common';

@Injectable()
export class StripeService {
  create() {
    return 'This action adds a new stripe';
  }

  findAll() {
    return `This action returns all stripe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripe`;
  }
}
