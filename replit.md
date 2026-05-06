# Har Ghar Cyber Surakshit

A cyber safety awareness platform with a full-featured web app for learning, scam training, and reporting — plus a cinematic animated hero background.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/cyber-safety-hub run dev` — run the main website
- `pnpm --filter @workspace/cyber-surakshit-video run dev` — run the animated video
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- Required env: `DATABASE_URL` — Postgres connection string (not yet used)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Website: React + Vite + Tailwind CSS + Framer Motion + Recharts + Wouter
- Video: React + Vite + Framer Motion (video-js artifact)
- API: Express 5 (not yet used by frontend — all data is static)
- DB: PostgreSQL + Drizzle ORM (provisioned, schema empty)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- Website: `artifacts/cyber-safety-hub/src/` — pages in `src/pages/`, components in `src/components/`
- Video: `artifacts/cyber-surakshit-video/src/components/video/` — scenes in `video_scenes/`
- API server: `artifacts/api-server/src/`
- DB schema: `lib/db/src/schema/index.ts`
- OpenAPI spec: `lib/api-spec/openapi.yaml`

## Architecture decisions

- Frontend is fully static/dummy data — no backend integration yet
- Video uses the video-js artifact pattern with `useVideoPlayer` hook (do not modify `src/lib/video/hooks.ts`)
- Scene selectors added to video via `VideoWithControls.tsx` wrapper + `useSceneControls.ts` hook
- Dark mode defaults to ON (appropriate for a cyber security app)
- Video neighborhood image served from `public/neighborhood.png` using `import.meta.env.BASE_URL`

## Product

- **Landing page** (`/`): Hero "Think Before You Click", stats, CTAs
- **Learning Modules** (`/learn`): Phishing, OTP Scams, Job Fraud, Payment Scams with quizzes
- **Scam Trainer** (`/trainer`): Interactive fake message identification
- **Reporting System** (`/report`): Incident submission form
- **Dashboard** (`/dashboard`): Charts (Recharts), XP, tips
- **Upgrade to Pro** (`/upgrade`): Free vs Pro tier comparison
- Animated Video (/cyber-surakshit-video/): 13.2s cinematic loop with Indian neighborhood, threat icons, blue shield wave, "Har Ghar Cyber Surakshit" reveal

## User preferences

- Theme: dark navy with cyan-blue cyber accents
- No emojis in UI
- Frontend-only with static/dummy data

## Gotchas

- Do NOT modify `artifacts/cyber-surakshit-video/src/lib/video/hooks.ts` — recording pipeline depends on it
- Video BASE_URL must be used for all `public/` asset references (e.g. `neighborhood.png`)
- After each OpenAPI spec change, re-run codegen before using updated types

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See `.local/skills/video-js/SKILL.md` for video animation patterns
