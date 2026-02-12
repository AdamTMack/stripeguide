export interface CodeExample {
  title: string
  language: string
  code: string
  annotations?: Record<number, string>
}

export const codeExamples: Record<string, CodeExample[]> = {
  'hosted-checkout': [
    {
      title: 'Create a Checkout Session (Server)',
      language: 'javascript',
      code: `const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  line_items: [{
    price: 'price_1234',
    quantity: 1,
  }],
  success_url: 'https://yoursite.com/success',
  cancel_url: 'https://yoursite.com/cancel',
});

// Redirect customer to Stripe
res.redirect(303, session.url);`,
      annotations: {
        1: 'Create session with payment mode',
        3: 'Reference a Price object you created in Dashboard',
        6: 'Where to send customer after payment',
        10: 'Redirect to Stripe-hosted checkout page',
      },
    },
  ],
  'embedded-checkout': [
    {
      title: 'Create Session with ui_mode (Server)',
      language: 'javascript',
      code: `const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  ui_mode: 'embedded',
  line_items: [{
    price: 'price_1234',
    quantity: 1,
  }],
  return_url: 'https://yoursite.com/return?session_id={CHECKOUT_SESSION_ID}',
});

res.json({ clientSecret: session.client_secret });`,
      annotations: {
        2: 'Set ui_mode to "embedded" for iframe',
        7: 'return_url instead of success_url/cancel_url',
        10: 'Send client_secret to frontend to mount iframe',
      },
    },
    {
      title: 'Mount Embedded Checkout (Client)',
      language: 'jsx',
      code: `import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_...');

function CheckoutPage() {
  const fetchClientSecret = async () => {
    const res = await fetch('/api/create-checkout-session');
    const { clientSecret } = await res.json();
    return clientSecret;
  };

  return (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{ fetchClientSecret }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}`,
      annotations: {
        6: 'Load Stripe.js with your publishable key',
        10: 'Fetch client_secret from your server',
        16: 'Provider handles mounting the iframe',
        20: 'Renders the Stripe checkout iframe',
      },
    },
  ],
  'payment-element': [
    {
      title: 'Create PaymentIntent (Server)',
      language: 'javascript',
      code: `const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  automatic_payment_methods: { enabled: true },
});

res.json({ clientSecret: paymentIntent.client_secret });`,
      annotations: {
        1: 'Amount in cents ($20.00)',
        3: 'Let Stripe pick the best payment methods',
        6: 'Send client_secret to mount Payment Element',
      },
    },
    {
      title: 'Payment Form (Client)',
      language: 'jsx',
      code: `import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://yoursite.com/complete',
      },
    });
    if (error) setMessage(error.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit">Pay</button>
    </form>
  );
}`,
      annotations: {
        3: 'useStripe() gives you the Stripe instance',
        8: 'confirmPayment handles 3D Secure automatically',
        19: 'PaymentElement renders all payment method inputs',
      },
    },
  ],
}
