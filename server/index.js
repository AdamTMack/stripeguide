import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const app = express();
const port = process.env.API_PORT || 3001;

app.use(cors());
app.use(express.json());

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('Missing STRIPE_SECRET_KEY in .env — server cannot start.');
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-checkout-session', async (req, res) => {
  const { mode = 'hosted' } = req.body;
  const origin = req.headers.origin || 'http://localhost:5173';

  try {
    if (mode === 'hosted') {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: 'Stripe Guide Demo Payment' },
            unit_amount: 2000,
          },
          quantity: 1,
        }],
        success_url: `${origin}?payment=success`,
        cancel_url: `${origin}?payment=cancelled`,
      });
      return res.json({ url: session.url });
    }

    if (mode === 'embedded') {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        ui_mode: 'embedded',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: 'Stripe Guide Demo Payment' },
            unit_amount: 2000,
          },
          quantity: 1,
        }],
        return_url: `${origin}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      });
      return res.json({ clientSecret: session.client_secret });
    }

    // payment-intent mode (for Payment Element)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });
    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err.message);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
