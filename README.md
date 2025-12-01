# PICABORD - Next.js Application

Advanced Technology Solutions platform built with Next.js, featuring PIKA1 product and technology divisions including TEC, ArcLight, Deeptech, and AnnotiQ.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Language**: TypeScript
- **Linting**: ESLint with Next.js configuration
- **Database**: Drizzle ORM with PostgreSQL (Neon)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```


### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```text
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # Client-side providers
│   ├── globals.css        # Global styles
│   └── api/               # API routes
├── components/            # React components
│   └── ui/               # UI component library
├── pages/                # Page components
├── lib/                  # Utilities and helpers
├── hooks/                # Custom React hooks
├── shared/               # Shared schemas and types
└── public/               # Static assets
```

## Features

- **PIKA1**: Flagship product showcase - High-performance single board computers
- **TEC**: Software Product Development & Engineering division

## Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL=your_database_url

# Analytics (Plausible)
NEXT_PUBLIC_ANALYTICS_DOMAIN=picabord.space
NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC=https://plausible.io/js/script.js
NEXT_PUBLIC_ANALYTICS_ENABLED=true
```

See [docs/ANALYTICS_SETUP.md](./docs/ANALYTICS_SETUP.md) for complete analytics configuration guide.

## Migration Notes

This project was migrated from Vite + React + Express to Next.js. See [MIGRATION.md](./MIGRATION.md) for details.

## License

MIT

## Raspberry Pi / Docker Hosting

This repository includes a Dockerfile and a GitHub Actions workflow that builds and publishes images to GitHub Container Registry (GHCR). See `docs/RPI_DEPLOYMENT.md` for full instructions on building, testing, and running the container on Raspberry Pi devices (arm64 v8). CI builds on this repository now target `linux/arm64/v8` only; other platforms must be built manually or via a custom workflow.


Note: This repository is configured for Vercel hosting by default. Docker build and GHCR publishing tooling remains in the repository for manual or legacy use, but automatic Docker CI is disabled. If you need to run Docker builds or publish images, use the scripts in `scripts/` or run the `.github/workflows/deploy.yml` via workflow dispatch.

This repository uses React 18.x to ensure compatibility with `framer-motion` and other peer-dependent libraries. If you notice a peer dependency install error, run `npm install` to update the lockfile and ensure your environment uses Node 18+.

After the recent dependency changes, please run locally and commit the lockfile before pushing:

```bash
npm install
git add package-lock.json
git commit -m "chore: update lockfile to match downgraded React & aligned react-three versions"
git push origin design-improvements-nov-2025
```

## Vercel Hosting (primary)

This project is set up for Vercel Next.js hosting. A minimal `vercel.json` is included to make repository import and deployment straightforward.

Quick steps to deploy on Vercel:

- Go to https://vercel.com and sign in with your GitHub account.
- Import the repository `ApxllxCartxr/picabord_web` and follow the prompts.
- Vercel will automatically run `npm ci` and `npm run build` (the `build` script is already defined in `package.json`).
- Add any required environment variables (database URL, analytics keys, secrets) in the Vercel project Settings → Environment Variables.

Notes:

- `vercel.json` declares Node 20 as the engine; change this if you require a different Node version.
- Vercel handles Next.js optimizations and serverless/static deployment nuances automatically; you do not need Docker to host on Vercel.
- The repository previously included CI to build Docker images for GHCR. Those automatic Docker builds are disabled by default in CI — Vercel is the primary host. Manual Docker builds are still possible via `.github/workflows/deploy.yml` (use workflow dispatch) or the `scripts/` helper scripts if you need container images.
