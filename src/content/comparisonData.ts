export interface MatrixCell {
  apiLabel: string
  uiLabel: string
  supported: boolean
  note?: string
}

export const matrixData: MatrixCell[] = [
  {
    apiLabel: 'Checkout Sessions',
    uiLabel: 'Hosted Checkout',
    supported: true,
    note: 'Redirect to checkout.stripe.com',
  },
  {
    apiLabel: 'Checkout Sessions',
    uiLabel: 'Embedded Checkout',
    supported: true,
    note: 'Stripe iframe in your page',
  },
  {
    apiLabel: 'Checkout Sessions',
    uiLabel: 'Payment Element',
    supported: true,
    note: 'Custom form with ui_mode: "custom"',
  },
  {
    apiLabel: 'Payment Intents',
    uiLabel: 'Hosted Checkout',
    supported: false,
    note: 'Not available with Payment Intents',
  },
  {
    apiLabel: 'Payment Intents',
    uiLabel: 'Embedded Checkout',
    supported: false,
    note: 'Not available with Payment Intents',
  },
  {
    apiLabel: 'Payment Intents',
    uiLabel: 'Payment Element',
    supported: true,
    note: 'Direct integration, most flexible',
  },
]

export const apiOptions = ['Checkout Sessions', 'Payment Intents'] as const
export const uiOptions = ['Hosted Checkout', 'Embedded Checkout', 'Payment Element'] as const

export interface CheckoutFeature {
  name: string
  description: string
  icon: string
}

export const checkoutFeatures: CheckoutFeature[] = [
  { name: 'Tax Calculation', description: 'Automatic tax computation for 50+ countries', icon: '🧮' },
  { name: 'Discount Codes', description: 'Built-in promo and coupon code support', icon: '🏷️' },
  { name: 'Shipping', description: 'Collect and calculate shipping addresses and rates', icon: '📦' },
  { name: 'Adaptive Pricing', description: 'Show prices in the customer\'s local currency', icon: '💱' },
  { name: 'Phone Collection', description: 'Optionally collect phone numbers', icon: '📱' },
  { name: 'Custom Fields', description: 'Add your own fields to the checkout form', icon: '📝' },
]

export interface UiComparison {
  feature: string
  hosted: string
  embedded: string
  paymentElement: string
}

export const uiComparisonData: UiComparison[] = [
  {
    feature: 'Where it lives',
    hosted: 'checkout.stripe.com',
    embedded: 'iframe in your page',
    paymentElement: 'Your own form',
  },
  {
    feature: 'Code required',
    hosted: 'Minimal (redirect)',
    embedded: 'Low (mount iframe)',
    paymentElement: 'Moderate (build form)',
  },
  {
    feature: 'Customization',
    hosted: 'Colors & logo only',
    embedded: 'Limited styling',
    paymentElement: 'Full control',
  },
  {
    feature: 'API compatibility',
    hosted: 'Checkout Sessions only',
    embedded: 'Checkout Sessions only',
    paymentElement: 'Both APIs',
  },
  {
    feature: 'PCI burden',
    hosted: 'None (SAQ A)',
    embedded: 'None (SAQ A)',
    paymentElement: 'Minimal (SAQ A)',
  },
  {
    feature: 'Best for',
    hosted: 'Quick launch, MVP',
    embedded: 'Branded experience',
    paymentElement: 'Full control & flexibility',
  },
]
