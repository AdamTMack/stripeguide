import type { Emotion } from '../engine/types'

interface DialogLine {
  text: string
  emotion?: Emotion
}

type SceneDialogues = Record<string, DialogLine[]>

export const dialogues: SceneDialogues = {
  // ── Act 1 ──
  'guide-intro': [
    {
      text: "Hey there! I'm your guide to the world of Stripe payments.",
      emotion: 'excited',
    },
    {
      text: "Don't worry — I'll keep things simple. No jargon, no fluff. Just the stuff that actually matters.",
      emotion: 'neutral',
    },
    {
      text: "By the end, you'll understand exactly how online payments work — and which Stripe tools to use.",
      emotion: 'winking',
    },
  ],
  'big-picture': [
    {
      text: "Let's start with the big picture. When someone buys something online, where does the money actually go?",
      emotion: 'thinking',
    },
    {
      text: 'It flows through a chain: Customer \u2192 Your App \u2192 Stripe \u2192 Bank. Stripe sits in the middle and handles the hard parts.',
      emotion: 'neutral',
    },
  ],

  // ── Act 2 ──
  'charges-api': [
    {
      text: "Back in the early days, Stripe had a simple API called Charges. You'd send a card number, and boom — money moved.",
      emotion: 'neutral',
    },
    {
      text: 'One API call. Card in, money out. Beautifully simple.',
      emotion: 'winking',
    },
  ],
  'why-charges-died': [
    {
      text: "Then the world changed. European regulations (PSD2) said: 'Hold on — banks need to verify the customer is real.'",
      emotion: 'warning',
    },
    {
      text: "This is called Strong Customer Authentication, or SCA. Think of it like a bouncer asking for ID at the door.",
      emotion: 'thinking',
    },
    {
      text: "The old Charges API couldn't handle this. It was a one-shot deal — no room for a back-and-forth with the bank.",
      emotion: 'neutral',
    },
  ],
  'charges-retire': [
    {
      text: "So Charges got a gold watch and a retirement party. It's still technically around, but nobody should use it for new projects.",
      emotion: 'celebrating',
    },
  ],
  'payment-intents': [
    {
      text: "Enter Payment Intents — Stripe's modern foundation. Instead of 'send card, get money,' you now declare your *intent* to collect a payment.",
      emotion: 'excited',
    },
    {
      text: "Think of it like placing an order at a restaurant. You say what you want, then things happen in steps — and you can track the whole journey.",
      emotion: 'neutral',
    },
  ],
  'state-machine': [
    {
      text: "A PaymentIntent goes through a lifecycle. Each step has a status, and you always know exactly where things stand.",
      emotion: 'thinking',
    },
    {
      text: 'It starts at "requires_payment_method" and, if all goes well, ends at "succeeded." If the bank asks for verification, it pauses at "requires_action."',
      emotion: 'neutral',
    },
  ],
  'checkout-sessions': [
    {
      text: "But what if you don't want to manage all those steps yourself?",
      emotion: 'thinking',
    },
    {
      text: "That's where Checkout Sessions come in. It's a higher-level API that wraps Payment Intents and adds a TON of built-in features.",
      emotion: 'excited',
    },
    {
      text: "Tax calculation, discount codes, shipping collection, adaptive pricing — all handled for you.",
      emotion: 'winking',
    },
  ],
  'checkout-features': [
    {
      text: "Here's what Checkout Sessions give you out of the box. No extra code needed.",
      emotion: 'excited',
    },
  ],
  'api-vs-ui': [
    {
      text: "OK, here's where everyone gets confused. Pay close attention...",
      emotion: 'warning',
    },
    {
      text: "People mix up the API layer (how you talk to Stripe) with the UI layer (what the customer sees). They're completely separate choices!",
      emotion: 'excited',
    },
  ],
  'matrix-reveal': [
    {
      text: "THIS is the key insight. The API you choose and the UI you show are independent decisions. Let me show you the full picture.",
      emotion: 'excited',
    },
  ],

  // ── Act 3 ──
  'ui-intro': [
    {
      text: "Now let's look at the three UI options — what your customer actually sees when they pay. Pick one to explore!",
      emotion: 'excited',
    },
  ],
  'hosted-checkout': [
    {
      text: "Hosted Checkout is the simplest option. Your customer gets redirected to a page on checkout.stripe.com — fully designed and maintained by Stripe.",
      emotion: 'neutral',
    },
    {
      text: "You write almost no frontend code. Stripe handles the form, validation, error messages, and even localization. It works with Checkout Sessions only.",
      emotion: 'winking',
    },
  ],
  'embedded-checkout': [
    {
      text: "Embedded Checkout puts a Stripe-hosted payment form right inside your page using an iframe. Your customer never leaves your site.",
      emotion: 'neutral',
    },
    {
      text: "You get the reliability of Stripe's hosted form with the feel of a native experience. Also Checkout Sessions only.",
      emotion: 'thinking',
    },
  ],
  'payment-element': [
    {
      text: "The Payment Element gives you the most control. It's a set of prebuilt UI components that live inside YOUR form.",
      emotion: 'excited',
    },
    {
      text: "You handle the layout, styling, and submission. And here's the cool part — it works with BOTH Checkout Sessions and Payment Intents.",
      emotion: 'winking',
    },
  ],
  'ui-comparison': [
    {
      text: "Now you've seen all three options. Let's put them side by side so you can compare.",
      emotion: 'neutral',
    },
  ],

  // ── Act 5 ──
  summary: [
    {
      text: "You made it! Based on your journey, here's your personalized Stripe integration plan.",
      emotion: 'celebrating',
    },
  ],
  'test-payment': [
    {
      text: "Want to see it in action? Let's make a real test payment using Stripe's test mode. No real money involved!",
      emotion: 'excited',
    },
  ],
  'cheat-sheet': [
    {
      text: "Here's your cheat sheet — everything you learned, in one place. Bookmark this!",
      emotion: 'winking',
    },
  ],
}

export function getDialogue(sceneId: string): DialogLine[] {
  return dialogues[sceneId] ?? []
}
