import { useState, useEffect, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { stripePromise, useStripeReady } from '../../hooks/useStripe'
import Button from '../ui/Button'

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
    })
    if (error) {
      setMessage(error.message ?? 'Payment failed')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="mt-4">
        <Button disabled={!stripe || loading}>
          {loading ? 'Processing...' : 'Pay $20.00'}
        </Button>
      </div>
      {message && (
        <p className="mt-2 text-sm text-red-400">{message}</p>
      )}
    </form>
  )
}

export default function PaymentElementDemo() {
  const ready = useStripeReady()
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  useEffect(() => {
    if (!ready) return
    fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'payment-intent' }),
    })
      .then((res) => res.json())
      .then(({ clientSecret }) => setClientSecret(clientSecret))
      .catch(() => {})
  }, [ready])

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
        Custom payment form using Stripe Payment Element
      </p>
      {clientSecret ? (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: { theme: 'night', variables: { colorPrimary: '#635BFF' } } }}
        >
          <CheckoutForm />
        </Elements>
      ) : (
        <p className="text-center text-sm text-white/30">Loading payment form...</p>
      )}
      <p className="mt-3 text-center text-xs text-white/30">
        Use test card 4242 4242 4242 4242
      </p>
    </motion.div>
  )
}
