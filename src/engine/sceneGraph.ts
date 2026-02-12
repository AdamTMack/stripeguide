import { lazy } from 'react'
import type { SceneNode } from './types'

export const scenes: SceneNode[] = [
  // ── Act 1: "So, you want to take a payment?" ──
  {
    id: 'landing',
    next: 'guide-intro',
    act: 1,
    component: () => import('../scenes/act1/LandingScene'),
  },
  {
    id: 'guide-intro',
    next: 'big-picture',
    act: 1,
    component: () => import('../scenes/act1/GuideIntroScene'),
  },
  {
    id: 'big-picture',
    next: 'charges-api',
    act: 1,
    component: () => import('../scenes/act1/BigPictureScene'),
  },

  // ── Act 2: The API Layer ──
  {
    id: 'charges-api',
    next: 'why-charges-died',
    act: 2,
    component: () => import('../scenes/act2/ChargesApiScene'),
  },
  {
    id: 'why-charges-died',
    next: 'charges-retire',
    act: 2,
    component: () => import('../scenes/act2/WhyChargesDiedScene'),
  },
  {
    id: 'charges-retire',
    next: 'payment-intents',
    act: 2,
    component: () => import('../scenes/act2/ChargesRetireScene'),
  },
  {
    id: 'payment-intents',
    next: 'state-machine',
    act: 2,
    component: () => import('../scenes/act2/PaymentIntentsScene'),
  },
  {
    id: 'state-machine',
    next: 'checkout-sessions',
    act: 2,
    component: () => import('../scenes/act2/StateMachineScene'),
  },
  {
    id: 'checkout-sessions',
    next: 'checkout-features',
    act: 2,
    component: () => import('../scenes/act2/CheckoutSessionsScene'),
  },
  {
    id: 'checkout-features',
    next: 'api-vs-ui',
    act: 2,
    component: () => import('../scenes/act2/CheckoutFeaturesScene'),
  },
  {
    id: 'api-vs-ui',
    next: 'matrix-reveal',
    act: 2,
    component: () => import('../scenes/act2/ApiVsUiScene'),
  },
  {
    id: 'matrix-reveal',
    next: 'ui-intro',
    act: 2,
    component: () => import('../scenes/act2/MatrixRevealScene'),
  },

  // ── Act 3: What Your Customer Sees ──
  {
    id: 'ui-intro',
    branches: [
      { label: 'Hosted Checkout', target: 'hosted-checkout', emoji: '🔗' },
      { label: 'Embedded Checkout', target: 'embedded-checkout', emoji: '🧩' },
      { label: 'Payment Element', target: 'payment-element', emoji: '🎨' },
    ],
    act: 3,
    component: () => import('../scenes/act3/UiIntroScene'),
  },
  {
    id: 'hosted-checkout',
    next: 'ui-comparison',
    act: 3,
    component: () => import('../scenes/act3/HostedCheckoutScene'),
  },
  {
    id: 'embedded-checkout',
    next: 'ui-comparison',
    act: 3,
    component: () => import('../scenes/act3/EmbeddedCheckoutScene'),
  },
  {
    id: 'payment-element',
    next: 'ui-comparison',
    act: 3,
    component: () => import('../scenes/act3/PaymentElementScene'),
  },
  {
    id: 'ui-comparison',
    next: 'summary',
    act: 3,
    component: () => import('../scenes/act3/UiComparisonScene'),
  },

  // ── Act 5: The Payoff ──
  {
    id: 'summary',
    next: 'test-payment',
    act: 5,
    component: () => import('../scenes/act5/SummaryScene'),
  },
  {
    id: 'test-payment',
    next: 'cheat-sheet',
    act: 5,
    component: () => import('../scenes/act5/TestPaymentScene'),
  },
  {
    id: 'cheat-sheet',
    act: 5,
    component: () => import('../scenes/act5/CheatSheetScene'),
  },
]

/** Map for O(1) scene lookup */
export const sceneMap = new Map(scenes.map((s) => [s.id, s]))

/** Lazy-loaded component map */
export const lazyComponents = new Map(
  scenes.map((s) => [s.id, lazy(s.component)])
)

/** Total scene count for progress */
export const totalScenes = scenes.length
