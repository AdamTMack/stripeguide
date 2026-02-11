# Stripe Payments Interactive Guide — Implementation Plan

## Context

We're building a narrative, conversational web experience that walks users through understanding Stripe payments. The target audience is laypeople (non-developers), with an optional "peek under the hood" lens for those who want to see the API layer. The experience is driven by a friendly avatar guide, uses full-screen slides with branching paths, and culminates in live Stripe demos and a personalized summary.

The core educational goals are:
1. Explain the evolution from legacy Charges API → Payment Intents → Checkout Sessions
2. Make **crystal clear** that the API choice (Checkout Sessions vs Payment Intents) is **completely independent** from the UI choice (Hosted Checkout vs Embedded Checkout vs Payment Element)
3. Visually demonstrate all three UI options with live Stripe embedded demos
4. Optionally reveal what's happening under the hood (API calls, webhooks, flow diagrams)

---

## Tech Stack

- **React 19 + TypeScript** — component framework
- **Vite 6** — build tool
- **Tailwind CSS 4** — styling
- **Framer Motion 12** — animations and transitions
- **Zustand 5** — state management for narrative/branching/choices
- **prism-react-renderer** — syntax-highlighted code blocks
- **@stripe/stripe-js + @stripe/react-stripe-js** — live demos (Phase 3)

---

## Architecture Overview

Three pillars:

1. **Scene Engine** — A declarative scene graph drives full-screen slides with Framer Motion transitions. Scenes are React.lazy-loaded components. Navigation is branching (not URL-based).
2. **Guide System** — An animated abstract glowing orb with contextual emoji expressions, typewriter dialog, and personality.
3. **Content Modules** — Five narrative "Acts" that plug into the scene engine as self-contained scenes.

---

## Narrative Structure

### Act 1: "So, you want to take a payment?"
- **Landing** — Full-screen hero with a big pulsing CTA button
- **Guide Intro** — The orb fades in, introduces itself, sets a warm conversational tone
- **Big Picture** — "How does money actually move?" Simple animated flow: Customer → Your App → Stripe → Bank

### Act 2: The API Layer (Critical Section)
- **Charges API** — "The old way. Send card, get money." Nostalgic, simple
- **Why Charges Died** — SCA, PSD2, 3D Secure explained with accessible analogies. "Banks started asking 'Are you really you?'"
- **Charges Retirement Party** — Fun visual moment with confetti and a gold watch
- **Payment Intents** — "You declare your *intent* to collect, then track it through a journey"
- **State Machine** — Interactive visualization of PI lifecycle (requires_payment_method → succeeded)
- **Checkout Sessions** — Higher-level abstraction. "What if Stripe handled even MORE?"
- **Built-in Features** — Animated showcase of tax, discounts, shipping, adaptive pricing
- **The Key Distinction** — Guide builds tension: "Here's where everyone gets confused..."
- **Matrix Reveal** — THE centerpiece. Animated 2D matrix showing API axis vs UI axis:

  |                      | Checkout Sessions | Payment Intents |
  |----------------------|:-:|:-:|
  | **Hosted Checkout**  | Yes | No |
  | **Embedded Checkout**| Yes | No |
  | **Payment Element**  | Yes | Yes |

  Animated in two stages: vertical axis first (API), then horizontal axis (UI), then cells fill in. The "aha moment."

### Act 3: What Your Customer Sees
Three explorable branches (user picks which to visit):
- **Hosted Checkout** — Redirect to checkout.stripe.com. Least code, most constraints.
- **Embedded Checkout** — Stripe iframe in your page. Medium complexity.
- **Payment Element** — Individual elements in your own form. Most flexible. Works with either API.

Each branch includes a live Stripe demo (Phase 3) and a "peek under the hood" overlay.

### Act 4: Under the Hood (Overlay System)
Available at any point via a floating "peek" button:
- **Flow Diagrams** — Animated sequence diagrams (Browser → Server → Stripe → Webhooks)
- **API Calls** — Annotated cURL/Node.js code with highlighted parameters
- **Webhook Payloads** — What events fire, when, and why, with sample JSON

### Act 5: The Payoff
- **Personalized Summary** — "Your Stripe Integration Plan" based on branching choices
- **Live Test Payment** — Walk through making a real test-mode payment with test cards
- **Cheat Sheet** — Beautiful comparison of everything learned + direct Stripe doc links

---

## File Structure

```
stripeguide/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── .env.example                    # VITE_STRIPE_PUBLISHABLE_KEY
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx
│   ├── App.tsx                     # SceneRenderer + ProgressBar shell
│   ├── index.css                   # Tailwind directives + custom fonts
│   │
│   ├── engine/                     # Scene navigation engine
│   │   ├── types.ts                # SceneNode, Branch, NarrativeState types
│   │   ├── sceneGraph.ts           # Declarative scene definitions
│   │   ├── SceneRenderer.tsx       # AnimatePresence + lazy loading
│   │   └── useSceneNavigation.ts   # Hook over Zustand store
│   │
│   ├── store/
│   │   ├── narrativeStore.ts       # Scene state, choices, history
│   │   └── overlayStore.ts         # Tech overlay open/close state
│   │
│   ├── components/
│   │   ├── guide/
│   │   │   ├── GlowOrb.tsx         # Animated CSS orb primitive
│   │   │   ├── GuideAvatar.tsx     # Orb + emotion states
│   │   │   ├── DialogBubble.tsx    # Typewriter text container
│   │   │   └── GuidePresence.tsx   # Avatar + dialog composed
│   │   ├── choices/
│   │   │   ├── ChoiceButton.tsx
│   │   │   └── ChoiceGroup.tsx
│   │   ├── navigation/
│   │   │   └── ProgressBar.tsx
│   │   ├── overlays/
│   │   │   ├── TechOverlay.tsx     # Sliding right panel
│   │   │   ├── PeekButton.tsx      # Floating trigger
│   │   │   ├── CodeBlock.tsx       # Syntax-highlighted code
│   │   │   ├── FlowDiagram.tsx     # Animated SVG sequence diagram
│   │   │   └── WebhookViewer.tsx   # Event log display
│   │   ├── visualizations/
│   │   │   ├── ComparisonMatrix.tsx # 2D API-vs-UI grid
│   │   │   ├── StateMachine.tsx    # PI lifecycle visualization
│   │   │   └── RetireAnimation.tsx # Charges API retirement party
│   │   ├── demos/                  # Phase 3
│   │   │   ├── HostedCheckoutDemo.tsx
│   │   │   ├── EmbeddedCheckoutDemo.tsx
│   │   │   └── PaymentElementDemo.tsx
│   │   ├── summary/
│   │   │   ├── SummaryCard.tsx
│   │   │   ├── CheatSheet.tsx
│   │   │   └── TestPaymentFlow.tsx
│   │   └── ui/
│   │       ├── Scene.tsx           # Full-screen slide wrapper
│   │       ├── AnimatedText.tsx
│   │       └── Button.tsx
│   │
│   ├── scenes/                     # One file per narrative beat
│   │   ├── act1/                   # Landing, GuideIntro, BigPicture
│   │   ├── act2/                   # Charges, WhyChargesDied, Retire, PI, StateMachine,
│   │   │                           # CheckoutSessions, Features, ApiVsUi, MatrixReveal
│   │   ├── act3/                   # UiIntro, Hosted, Embedded, PaymentElement, Comparison
│   │   └── act5/                   # Summary, TestPayment, CheatSheet
│   │
│   ├── content/                    # All narrative text + data, separate from components
│   │   ├── dialogues.ts            # Guide dialog by scene ID
│   │   ├── codeExamples.ts         # Annotated API call snippets
│   │   ├── webhookPayloads.ts      # Sample webhook JSON
│   │   └── comparisonData.ts       # Matrix + cheat sheet data
│   │
│   ├── hooks/
│   │   ├── useTypewriter.ts        # Character-by-character reveal
│   │   └── useStripe.ts            # Phase 3: Stripe.js init
│   │
│   └── lib/
│       ├── transitions.ts          # Framer Motion transition presets
│       ├── cn.ts                   # clsx + tailwind-merge
│       └── summaryGenerator.ts     # Builds personalized summary from choices
│
└── api/                            # Phase 3: Serverless functions
    └── create-checkout-session.ts
```

---

## Phased Implementation

### Phase 1: Core Engine + Acts 1-2 (MVP)
**Goal**: Working narrative from landing through the Matrix Reveal, with branching choices, guide avatar, and transitions. No live Stripe demos yet.

1. **Project scaffolding** — Vite + React + TS + Tailwind + Framer Motion + Zustand setup
2. **Engine core** — `types.ts`, `sceneGraph.ts`, `narrativeStore.ts`, `SceneRenderer.tsx`, `useSceneNavigation.ts`, `transitions.ts`
3. **UI primitives** — `Scene.tsx`, `GlowOrb.tsx`, `GuideAvatar.tsx`, `useTypewriter.ts`, `DialogBubble.tsx`, `GuidePresence.tsx`, `ChoiceButton.tsx`, `ChoiceGroup.tsx`, `ProgressBar.tsx`, `Button.tsx`, `AnimatedText.tsx`
4. **Act 1 scenes** — `LandingScene`, `GuideIntroScene`, `BigPictureScene`
5. **Act 2 scenes** — `ChargesApiScene`, `WhyChargesDiedScene`, `ChargesRetireScene`, `PaymentIntentsScene`, `StateMachineScene`, `CheckoutSessionsScene`, `CheckoutFeaturesScene`, `ApiVsUiScene`, `MatrixRevealScene`
6. **Content** — `dialogues.ts` for Acts 1-2, `comparisonData.ts` for the matrix
7. **App shell** — Wire App.tsx, keyboard nav (arrow keys), basic responsive layout

### Phase 2: Act 3 + Tech Overlays
**Goal**: Three UI option branches with animated mockups (placeholder for live demos) + the "under the hood" overlay system.

1. **Overlay system** — `overlayStore.ts`, `TechOverlay.tsx`, `PeekButton.tsx`, `CodeBlock.tsx`, `FlowDiagram.tsx`, `WebhookViewer.tsx`
2. **Act 3 scenes** — `UiIntroScene`, `HostedCheckoutScene`, `EmbeddedCheckoutScene`, `PaymentElementScene`, `UiComparisonScene`
3. **Content** — `codeExamples.ts`, `webhookPayloads.ts`, `dialogues.ts` for Act 3

### Phase 3: Live Stripe Demos
**Goal**: Replace mockups with real Stripe test-mode integrations.

1. **Serverless backend** — `api/create-checkout-session.ts` for creating test sessions
2. **Live demos** — `HostedCheckoutDemo`, `EmbeddedCheckoutDemo`, `PaymentElementDemo`
3. **Stripe integration** — `useStripe.ts`, wire `@stripe/react-stripe-js` with `CheckoutProvider`

### Phase 4: Ending + Polish
**Goal**: Complete Act 5, personalized summary, test payment flow, cheat sheet, final polish.

1. **Summary** — `summaryGenerator.ts`, `SummaryCard.tsx`, `SummaryScene`
2. **Test payment** — `TestPaymentFlow.tsx`, `TestPaymentScene`
3. **Cheat sheet** — `CheatSheet.tsx`, `CheatSheetScene`
4. **Polish** — Responsive pass, accessibility (focus management, reduced motion), loading states, error boundaries

---

## Key Design Decisions

- **Scene graph over React Router** — Navigation is narrative-driven (not URL-based). The scene graph supports branching natively and makes progress computation trivial.
- **Zustand over Context** — Selector-based subscriptions prevent re-renders. State lives outside React tree for easier debugging.
- **React.lazy for every scene** — Initial bundle stays tiny. Only engine + first scene loads upfront.
- **Content separated from components** — All dialog text in `content/dialogues.ts`. Easy to iterate on copy without touching components.
- **Stripe CheckoutProvider (not Elements provider)** — For Phase 3 live demos using Checkout Sessions + Payment Element, we use `CheckoutProvider` from `@stripe/react-stripe-js/checkout` and confirm via `checkout.confirm()`. This is the modern recommended approach.

## Content Accuracy Notes

- Charges API is "legacy" and "not recommended" (not officially deprecated/removed, but no new features). Cannot handle SCA/3DS.
- PaymentIntent lifecycle: `requires_payment_method` → `requires_confirmation` → `requires_action` (3DS) → `processing` → `succeeded`
- Checkout Sessions `ui_mode` values: `"hosted"`, `"embedded"`, `"custom"`
- Hosted and Embedded are Checkout Sessions-exclusive. Payment Element works with both Checkout Sessions (`ui_mode: "custom"`) and Payment Intents (direct).
- React integration for Checkout Sessions + Payment Element uses `CheckoutProvider` and `checkout.confirm()`, NOT the standard `Elements` provider.

---

## Verification Plan

After each phase:
1. `npm run dev` — Verify the app loads, all scenes render, transitions work
2. Navigate full flow — Click through every scene, test all branches, verify back navigation
3. Test overlay system — Open/close tech overlays on multiple scenes
4. Responsive check — Test at 375px (mobile), 768px (tablet), 1440px (desktop)
5. `npm run build` — Verify production build succeeds with no errors
6. Phase 3 specifically: Test all three live Stripe demos with test card `4242424242424242`
