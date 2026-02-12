export interface WebhookEvent {
  type: string
  description: string
  when: string
  payload: string
}

export const webhookEvents: Record<string, WebhookEvent[]> = {
  'hosted-checkout': [
    {
      type: 'checkout.session.completed',
      description: 'Payment successful, session is complete',
      when: 'After customer completes payment on checkout.stripe.com',
      payload: `{
  "id": "evt_1234",
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_test_abc123",
      "payment_status": "paid",
      "status": "complete",
      "amount_total": 2000,
      "currency": "usd",
      "customer_email": "jane@example.com"
    }
  }
}`,
    },
  ],
  'embedded-checkout': [
    {
      type: 'checkout.session.completed',
      description: 'Embedded checkout payment succeeded',
      when: 'After customer submits payment in embedded iframe',
      payload: `{
  "id": "evt_5678",
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_test_def456",
      "ui_mode": "embedded",
      "payment_status": "paid",
      "status": "complete",
      "amount_total": 2000
    }
  }
}`,
    },
  ],
  'payment-element': [
    {
      type: 'payment_intent.succeeded',
      description: 'Payment confirmed and funds captured',
      when: 'After successful payment confirmation (including 3D Secure)',
      payload: `{
  "id": "evt_9012",
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_test_ghi789",
      "status": "succeeded",
      "amount": 2000,
      "currency": "usd",
      "payment_method": "pm_card_visa"
    }
  }
}`,
    },
    {
      type: 'payment_intent.payment_failed',
      description: 'Payment attempt failed',
      when: 'When a payment is declined or 3D Secure fails',
      payload: `{
  "id": "evt_3456",
  "type": "payment_intent.payment_failed",
  "data": {
    "object": {
      "id": "pi_test_ghi789",
      "status": "requires_payment_method",
      "last_payment_error": {
        "code": "card_declined",
        "message": "Your card was declined."
      }
    }
  }
}`,
    },
  ],
}
