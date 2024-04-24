import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeService } from './stripe.service';

export const stripe = new Stripe(
  'sk_test_51Kj6edBDRmIBw8th8aBdl17OqwNkF2A3bSWXdrsQMlAASWPH5GTKvw4BTeOHW3SrWNNvKVHWT3iEaYyG3QIpfng0005nhNpZT3',
  {
    apiVersion: '2020-08-27',
  },
);

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('/stripe-account')
  async createStripeAccount(@Body() { email, country }) {
    const stripeAccount = await stripe.accounts.create({
      type: 'standard',
      country,
      email,
    });
    // return the id to save on user (stripe id)
    return stripeAccount;
  }

  @Get('secret/:id')
  async getClientSecret(@Param('id') id: string) {
    const intent = await stripe.paymentIntents.retrieve(id);

    return intent;
  }

  @Get('/stripe-account')
  async getStripeAccount(@Body() { accountId }) {
    const stripeAccount = await stripe.accounts.retrieve(accountId);

    return stripeAccount;
  }

  @Post('/stripe-payment')
  async createStripePayment(@Body() { amount, currency, account, email }) {
    let customer: Stripe.Customer;
    const existingCustomer = await stripe.customers.list({ email });

    if (existingCustomer.data.length > 0) {
      [customer] = existingCustomer.data;
    } else {
      customer = await stripe.customers.create({ email });
    }

    const stripePayment = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customer.id,
      payment_method: 'pm_card_visa',
      application_fee_amount: Number((amount / 10).toFixed()),
      transfer_data: {
        destination: 'acct_1Knt1CB1S1oXTBc3', // artchapp account id
      },
      automatic_payment_methods: {
        enabled: true,
      },
      confirm: true,
      return_url: 'https://artch-app.web.app',
      receipt_email: email,
    });

    // Split Payment transfer
    // const transfer = await stripe.transfers.create({
    //   amount: amount * 0.9,
    //   currency: 'usd',
    //   destination: 'acct_1GXxXxXxXxXxXxXxXx',
    //   transfer_group: 'ORDER_123',
    // });

    // Split payment transfer to other account
    // const transferToOtherAccount = await stripe.transfers.create({
    //   amount: amount * 0.1,
    //   currency: 'usd',
    //   destination: 'acct_1GXxXxXxXxXxXxXxXx',
    //   transfer_group: 'ORDER_123',
    // });

    // return the id to save on purchase (order id)
    return stripePayment;
  }

  @Post('/stripe-account/checkout')
  async createStripeCheckout(@Body() { professionalId, amount, currency, quantity, priceId }) {
    let price: Stripe.Price;
    const hasPrice = await stripe.prices.retrieve(priceId);

    if (!hasPrice) {
      price = await stripe.prices.create({
        currency,
        unit_amount: amount,
      });
    } else {
      price = hasPrice;
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/failure',
      payment_intent_data: {
        application_fee_amount: 123,
        transfer_data: {
          destination: professionalId,
        },
      },
    });

    return session;
  }

  @Post('account-link')
  async createAccountLink(@Body() { account, url }) {
    const accountLink = await stripe.accountLinks.create({
      account,
      return_url: url,
      refresh_url: url,
      type: 'account_onboarding',
    });

    return accountLink;
  }
}
