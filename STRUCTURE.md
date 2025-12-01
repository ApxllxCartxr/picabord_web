# PICABORD Website - Optimized Next.js App Router Structure

## Overview
The website has been optimized to follow Next.js 15 App Router best practices with proper file-based routing and server/client component separation.

## Directory Structure

```
app/
├── layout.tsx              # Root layout with metadata and providers
├── client-layout.tsx       # Client-side navigation wrapper
├── page.tsx                # Home page (/)
├── about/
│   └── page.tsx           # About page (/about)
├── contact/
│   └── page.tsx           # Contact page (/contact)
├── pika/
│   └── page.tsx           # PIKA product page (/pika)
├── tec/
│   └── page.tsx           # TEC division page (/tec)
├── api/
│   └── users/
│       └── route.ts       # API route
└── globals.css            # Global styles

components/
├── icons/
│   └── custom-icons.tsx   # Custom SVG icons
├── ui/                    # shadcn/ui components
├── CompanyOverview.tsx    # Company overview section
├── Hero.tsx               # Hero section
├── Navigation.tsx         # Navigation bar
├── Footer.tsx             # Footer
├── Prism.tsx              # 3D background effect
└── ThemeToggle.tsx        # Dark/light mode toggle

hooks/
├── use-scroll-animation.ts  # Scroll-based animations
├── use-parallax.ts          # Parallax effects
└── use-toast.ts             # Toast notifications

pages/                     # Legacy components (to be deprecated)
├── Home.tsx
├── About.tsx
├── Contact.tsx
├── PIKA.tsx
└── Division.tsx
```

## Routing

### File-Based Routing
The app now uses Next.js App Router with proper file-based routing:

- `/` → `app/page.tsx` (Home)
- `/about` → `app/about/page.tsx` (About)
- `/contact` → `app/contact/page.tsx` (Contact)
- `/pika` → `app/pika/page.tsx` (PIKA Product)
- `/tec` → `app/tec/page.tsx` (TEC Division)

### Navigation
- Uses Next.js `<Link>` components for client-side navigation
- Automatic route prefetching for better performance
- Active route highlighting in navigation bar

## Key Features

### Server & Client Components
- **Server Components**: Layout, metadata, static content
- **Client Components**: Interactive elements (marked with `'use client'`)

### Performance Optimizations
1. **Automatic Code Splitting**: Each route is automatically code-split
2. **Route Prefetching**: Links are prefetched on hover
3. **Optimized Images**: Using Next.js Image component
4. **Font Optimization**: Google Fonts loaded via next/font

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Animations**: Scroll-based and parallax effects
- **Dark Mode**: Theme toggle with next-themes
- **Custom Font**: PICABORD brand font loaded globally

## Migration from Pages Router

### Before (Single Page App)
```tsx
// app/page.tsx
const [section, setSection] = useState("home");
// Switch statement to render different components
```

### After (App Router)
```tsx
// Proper routes
app/page.tsx        → Home
app/about/page.tsx  → About
app/contact/page.tsx → Contact
```

## Benefits of New Structure

1. **Better SEO**: Each page has its own URL and can be indexed
2. **Faster Navigation**: Automatic prefetching and code splitting
3. **Improved Performance**: Only load what's needed for each route
4. **Better Developer Experience**: Clear file structure, easier to maintain
5. **Future-Proof**: Aligned with Next.js 15 best practices

## Development

### Running the App
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Testing
```bash
npm test
```

## Notes

- The `pages/` directory components are kept for backward compatibility but should be migrated to the new structure
- All navigation now uses Next.js Link components for optimal performance
- Client-side state management is handled in `client-layout.tsx`
- The Navigation component automatically highlights the active route based on pathname

## Future Improvements

1. Migrate remaining `pages/` components to proper App Router pages
2. Add loading.tsx and error.tsx for better UX
3. Implement route groups for better organization
4. Add metadata for each page for better SEO
5. Consider implementing parallel routes for complex layouts
