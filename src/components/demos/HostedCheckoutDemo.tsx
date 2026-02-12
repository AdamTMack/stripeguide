import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import { useStripeReady } from '../../hooks/useStripe'

export default function HostedCheckoutDemo() {
  const ready = useStripeReady()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'hosted' }),
      })
      const { url } = await res.json()
      window.location.href = url
    } catch {
      setLoading(false)
    }
  }

  if (!ready) {
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
      className="rounded-xl border border-stripe-purple/20 bg-stripe-purple/5 p-6 text-center"
    >
      <p className="mb-4 text-sm text-white/60">
        Click below to be redirected to Stripe's hosted checkout page
      </p>
      <Button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Redirecting...' : 'Try Hosted Checkout'}
      </Button>
      <p className="mt-3 text-xs text-white/30">
        Use test card 4242 4242 4242 4242
      </p>
    </motion.div>
  )
}
