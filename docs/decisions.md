# Decisions Log

Critical decisions that carry across sessions.

---

## Session 1

- **Scene graph over React Router** — Navigation is narrative-driven, not URL-based. Scene graph supports branching natively and makes progress trivial to compute.
- **Zustand over Context** — Selector-based subscriptions prevent re-renders. State lives outside React tree.
- **React.lazy for every scene** — Initial bundle stays tiny; only engine + first scene loads upfront.
- **Content separated from components** — All dialog in `content/dialogues.ts`, code examples in `codeExamples.ts`. Edit copy without touching components.
- **Tailwind CSS v4** — Uses `@import "tailwindcss"` + `@theme {}` block, not tailwind.config.js. Vite plugin is `@tailwindcss/vite`.
- **Framer Motion ease arrays use `as const`** — Required for TypeScript tuple typing throughout codebase.
- **No Act 4 scenes** — "Under the Hood" content exists as an overlay system (Code/Flow/Webhooks tabs), not as dedicated scenes.

## Session 2

- **Express + Vite proxy for backend** — Chose local Express server on port 3001 with Vite `server.proxy` over Vercel serverless or Netlify functions. Rationale: works immediately for local dev, no deployment needed, frontend code unchanged.
- **Plain JS for server** — `server/index.js` is plain JavaScript (not TypeScript) to avoid needing a separate compile step for the backend.
- **Demos render below mockups** — Act 3 scenes always show the static mockup (educational) with the live demo below. Mockup is not replaced by demo.
- **TestPaymentScene uses PaymentElementDemo** — Chose Payment Element (most hands-on) over Hosted/Embedded for the Act 5 test payment experience.
- **`concurrently` for dual-server dev** — `npm run dev:full` runs both Vite and Express simultaneously.
