interface SummaryResult {
  recommendedApi: string
  recommendedUi: string
  complexity: string
  description: string
  nextSteps: string[]
  stripeDocsUrl: string
}

const recommendations: Record<string, SummaryResult> = {
  'Hosted Checkout': {
    recommendedApi: 'Checkout Sessions',
    recommendedUi: 'Hosted Checkout',
    complexity: 'Low',
    description:
      'The fastest way to start accepting payments. Stripe hosts the entire checkout page — you just redirect customers and handle the result.',
    nextSteps: [
      'Create a Checkout Session on your server',
      'Redirect the customer to session.url',
      'Handle the checkout.session.completed webhook',
      'Display a success page',
    ],
    stripeDocsUrl: 'https://docs.stripe.com/checkout/quickstart',
  },
  'Embedded Checkout': {
    recommendedApi: 'Checkout Sessions',
    recommendedUi: 'Embedded Checkout',
    complexity: 'Low-Medium',
    description:
      'Stripe checkout embedded directly in your page via an iframe. Customers never leave your site, and you still get all the built-in Checkout features.',
    nextSteps: [
      'Create a Checkout Session with ui_mode: "embedded"',
      'Pass the client_secret to EmbeddedCheckoutProvider',
      'Mount the EmbeddedCheckout component',
      'Handle the checkout.session.completed webhook',
    ],
    stripeDocsUrl: 'https://docs.stripe.com/checkout/embedded/quickstart',
  },
  'Payment Element': {
    recommendedApi: 'Checkout Sessions or Payment Intents',
    recommendedUi: 'Payment Element',
    complexity: 'Medium',
    description:
      'Maximum flexibility and control. Build your own checkout form with Stripe UI components. Works with both API layers depending on your needs.',
    nextSteps: [
      'Create a PaymentIntent or Checkout Session on your server',
      'Initialize Elements with the client_secret',
      'Render PaymentElement in your custom form',
      'Call stripe.confirmPayment() on submit',
      'Handle the payment_intent.succeeded webhook',
    ],
    stripeDocsUrl: 'https://docs.stripe.com/payments/quickstart',
  },
}

export function generateSummary(choices: Record<string, string>): SummaryResult {
  const uiChoice = choices['ui-choice'] ?? 'Hosted Checkout'
  return recommendations[uiChoice] ?? recommendations['Hosted Checkout']
}
