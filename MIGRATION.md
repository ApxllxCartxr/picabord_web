# Migration to Next.js

This project has been migrated from Vite + React + Express to Next.js with App Router.

## Changes Made

### Architecture
- **Frontend**: Migrated from Vite + React to Next.js 15 with App Router
- **Backend**: Converted Express API routes to Next.js API routes
- **Styling**: Kept Tailwind CSS configuration
- **Linting**: Added ESLint with Next.js configuration

### File Structure
```
app/
├── layout.tsx          # Root layout (replaces client/index.html)
├── page.tsx           # Main page (replaces client/src/App.tsx)
├── globals.css        # Global styles (from client/src/index.css)
├── providers.tsx      # Client-side providers
└── api/               # API routes (replaces server/routes.ts)
    └── users/
        ├── route.ts
        └── [id]/route.ts

components/            # UI components (copied from client/src/components)
lib/                   # Utilities (copied from client/src/lib + server/storage.ts)
pages/                 # Page components (copied from client/src/pages)
hooks/                 # React hooks (copied from client/src/hooks)
shared/                # Shared schemas (unchanged)
```

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Dependencies
- Added: `next`, `eslint`, `eslint-config-next`
- Removed: `vite`, `express`, `@vitejs/plugin-react`, and related Vite plugins

### Configuration
- `next.config.js` - Next.js configuration with Turbopack support
- `tsconfig.json` - Updated for Next.js
- `tailwind.config.ts` - Updated content paths for Next.js
- `.eslintrc.json` - ESLint configuration for Next.js

## Known Issues
- Image imports from `@assets` are temporarily commented out pending path resolution
  - Images exist in `attached_assets/generated_images/`
  - Path alias configured in `tsconfig.json` and `next.config.js`
  - Need to uncomment imports in: `components/Hero.tsx`, `components/CompanyOverview.tsx`, `pages/PIKA.tsx`, `pages/Division.tsx`

## Completed
✅ Next.js 15 with App Router configured
✅ Tailwind CSS working
✅ ESLint configured with Next.js rules
✅ All components migrated to new structure
✅ Client/Server component separation implemented
✅ API routes structure created
✅ TypeScript configuration updated
✅ Build system working

## Next Steps
1. Uncomment and fix asset import paths (use Next.js Image component)
2. Test all page navigation and functionality
3. Implement authentication middleware if needed
4. Add any missing API endpoints
5. Deploy to production

## Running the Application
```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint
```