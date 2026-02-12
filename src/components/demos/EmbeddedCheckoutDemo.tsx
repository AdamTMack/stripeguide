import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import { stripePromise, useStripeReady } from '../../hooks/useStripe'

export default function EmbeddedCheckoutDemo() {
  const ready = useStripeReady()

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'embedded' }),
    })
    const { clientSecret } = await res.json()
    return clientSecret
  }, [])

  if (!ready || !stripePromise) {
    return (
      <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-center text-sm text-yellow-300/70">
        Add VITE_STRIPE_PUBLISHABLE_KEY to .env to enable live demos
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-stripe-purple/20 bg-stripe-purple/5 p-6"
    >
      <p className="mb-4 text-center text-sm text-white/60">
        Stripe Embedded Checkout rendered in an iframe below
      </p>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
      <p className="mt-3 text-center text-xs text-white/30">
        Use test card 4242 4242 4242 4242
      </p>
    </motion.div>
  )
}
