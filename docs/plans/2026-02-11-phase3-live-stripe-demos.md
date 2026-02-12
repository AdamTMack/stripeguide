# Phase 3: Live Stripe Demos — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Wire up live Stripe test-mode demos in Act 3 scenes and TestPaymentScene, backed by a local Express dev server.

**Architecture:** A small Express server (`server/index.js`) handles one POST endpoint that creates Checkout Sessions (hosted/embedded) or PaymentIntents. Vite proxies `/api` requests to the Express server. The 3 existing demo components are imported into their Act 3 scenes below the static mockups. TestPaymentScene gets a real PaymentElementDemo.

**Tech Stack:** Express, Stripe Node SDK, cors, dotenv, concurrently (dev dependency)

---

### Task 1: Install backend dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install production deps for the server**

Run: `cd /Users/adammack/Documents/stripeguide && npm install stripe express cors dotenv`

**Step 2: Install concurrently as dev dep**

Run: `npm install -D concurrently`

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add express, stripe, cors, dotenv, concurrently deps"
```

---

### Task 2: Create the Express API server

**Files:**
- Create: `server/index.js`

**Step 1: Create the server file**

Create `server/index.js` with this content:

```js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const app = express();
const port = process.env.API_PORT || 3001;

app.use(cors());
app.use(express.json());

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
```

**Step 2: Verify the server starts (needs .env first — skip runtime test for now)**

**Step 3: Commit**

```bash
git add server/index.js
git commit -m "feat: add Express API server for Stripe checkout sessions"
```

---

### Task 3: Configure Vite proxy and npm scripts

**Files:**
- Modify: `vite.config.ts`
- Modify: `package.json` (scripts section)

**Step 1: Add proxy to vite.config.ts**

Add `server.proxy` config to forward `/api` to Express:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
```

**Step 2: Update package.json scripts**

```json
"scripts": {
  "dev": "vite",
  "dev:server": "node server/index.js",
  "dev:full": "concurrently \"npm run dev\" \"npm run dev:server\"",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

**Step 3: Commit**

```bash
git add vite.config.ts package.json
git commit -m "feat: add Vite proxy for /api and dev:full script"
```

---

### Task 4: Update .env.example

**Files:**
- Modify: `.env.example`

**Step 1: Add STRIPE_SECRET_KEY to .env.example**

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
```

**Step 2: Commit**

```bash
git add .env.example
git commit -m "docs: add STRIPE_SECRET_KEY to .env.example"
```

---

### Task 5: Wire HostedCheckoutDemo into HostedCheckoutScene

**Files:**
- Modify: `src/scenes/act3/HostedCheckoutScene.tsx`

**Step 1: Import and render demo below the mockup**

Add `import HostedCheckoutDemo from '../../components/demos/HostedCheckoutDemo'` at the top.

Inside the `showContent` block, after the feature badges `<div>` and before the `<Button>`, add:

```tsx
{/* Live demo */}
<HostedCheckoutDemo />
```

**Step 2: Verify build passes**

Run: `cd /Users/adammack/Documents/stripeguide && npx tsc -b --noEmit`

**Step 3: Commit**

```bash
git add src/scenes/act3/HostedCheckoutScene.tsx
git commit -m "feat: wire HostedCheckoutDemo into HostedCheckoutScene"
```

---

### Task 6: Wire EmbeddedCheckoutDemo into EmbeddedCheckoutScene

**Files:**
- Modify: `src/scenes/act3/EmbeddedCheckoutScene.tsx`

**Step 1: Import and render demo below the mockup**

Add `import EmbeddedCheckoutDemo from '../../components/demos/EmbeddedCheckoutDemo'` at the top.

Inside the `showContent` block, after the feature badges `<div>` and before the `<Button>`, add:

```tsx
{/* Live demo */}
<EmbeddedCheckoutDemo />
```

**Step 2: Verify build passes**

Run: `npx tsc -b --noEmit`

**Step 3: Commit**

```bash
git add src/scenes/act3/EmbeddedCheckoutScene.tsx
git commit -m "feat: wire EmbeddedCheckoutDemo into EmbeddedCheckoutScene"
```

---

### Task 7: Wire PaymentElementDemo into PaymentElementScene

**Files:**
- Modify: `src/scenes/act3/PaymentElementScene.tsx`

**Step 1: Import and render demo below the mockup**

Add `import PaymentElementDemo from '../../components/demos/PaymentElementDemo'` at the top.

Inside the `showContent` block, after the feature badges `<div>` and before the `<Button>`, add:

```tsx
{/* Live demo */}
<PaymentElementDemo />
```

**Step 2: Verify build passes**

Run: `npx tsc -b --noEmit`

**Step 3: Commit**

```bash
git add src/scenes/act3/PaymentElementScene.tsx
git commit -m "feat: wire PaymentElementDemo into PaymentElementScene"
```

---

### Task 8: Build TestPaymentScene with real Payment Element

**Files:**
- Modify: `src/scenes/act5/TestPaymentScene.tsx`

**Step 1: Replace placeholder with live PaymentElementDemo**

Replace the entire component with a proper implementation that shows the guide dialog, then renders the PaymentElementDemo component. Keep the guide dialog and scene structure, but replace the placeholder text with the actual demo component.

```tsx
import { useState } from 'react'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import GuidePresence from '../../components/guide/GuidePresence'
import AnimatedText from '../../components/ui/AnimatedText'
import PaymentElementDemo from '../../components/demos/PaymentElementDemo'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { getDialogue } from '../../content/dialogues'

export default function TestPaymentScene() {
  const { goNext } = useSceneNavigation()
  const lines = getDialogue('test-payment')
  const [showContent, setShowContent] = useState(false)

  return (
    <Scene>
      <div className="flex flex-col gap-8">
        <AnimatedText as="h2" className="text-3xl font-bold md:text-4xl" gradient>
          Live Test Payment
        </AnimatedText>

        <GuidePresence
          text={lines[0]?.text ?? ''}
          emotion={lines[0]?.emotion}
          onComplete={() => setShowContent(true)}
        />

        {showContent && (
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/60">
                Use test card <span className="font-mono text-stripe-purple">4242 4242 4242 4242</span> with any future expiry and any CVC.
              </p>
            </div>

            <PaymentElementDemo />

            <Button onClick={goNext}>Continue to Cheat Sheet</Button>
          </div>
        )}
      </div>
    </Scene>
  )
}
```

**Step 2: Verify build passes**

Run: `npx tsc -b --noEmit`

**Step 3: Commit**

```bash
git add src/scenes/act5/TestPaymentScene.tsx
git commit -m "feat: replace TestPaymentScene placeholder with live Payment Element"
```

---

### Task 9: Full build verification

**Step 1: Run TypeScript check**

Run: `cd /Users/adammack/Documents/stripeguide && npx tsc -b --noEmit`
Expected: 0 errors

**Step 2: Run production build**

Run: `npm run build`
Expected: Build succeeds, chunk count increases by 0-3 (demo components may be split)

**Step 3: Verify no regressions**

Run: `npm run lint`
Expected: No new errors

---

## Summary of all files touched

**Created:**
- `server/index.js` — Express API server

**Modified:**
- `package.json` — New deps + scripts
- `vite.config.ts` — Proxy config
- `.env.example` — Added STRIPE_SECRET_KEY
- `src/scenes/act3/HostedCheckoutScene.tsx` — Import + render demo
- `src/scenes/act3/EmbeddedCheckoutScene.tsx` — Import + render demo
- `src/scenes/act3/PaymentElementScene.tsx` — Import + render demo
- `src/scenes/act5/TestPaymentScene.tsx` — Full rewrite with live demo
