# Design Document: Website Design Improvements

## Overview

This design document outlines the technical approach for implementing design improvements to the PICABORD website. The improvements focus on enhancing user experience through animations, visual consistency, better responsiveness, and improved accessibility while maintaining the existing aurora-themed design system.

The implementation will leverage existing Next.js 15, Tailwind CSS, and Radix UI infrastructure, adding new utilities and components where needed to achieve the desired user experience improvements.

## Architecture

### Component Structure

The design improvements will be implemented through:

1. **New Utility Hooks**: Custom React hooks for scroll animations and intersection observers
2. **Enhanced CSS Utilities**: Additional Tailwind classes and custom CSS for animations
3. **Component Enhancements**: Updates to existing components (Navigation, Hero, Forms, Cards)
4. **New UI Components**: Toast notifications, loading indicators, and skeleton loaders
5. **Global Style Updates**: Refinements to the theme system and global CSS

### Technology Stack Alignment

- **Framework**: Next.js 15 with App Router (existing)
- **Styling**: Tailwind CSS with custom animations (enhanced)
- **UI Components**: Radix UI + shadcn/ui (enhanced)
- **Animation Library**: Framer Motion (new dependency)
- **Form Validation**: React Hook Form + Zod (new dependencies)

## Components and Interfaces

### 1. Animation System

#### useScrollAnimation Hook

```typescript
interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

function useScrollAnimation(options?: ScrollAnimationOptions): {
  ref: RefObject<HTMLElement>;
  isVisible: boolean;
}
```

**Purpose**: Detect when elements enter the viewport for fade-in animations

**Implementation**:
- Uses Intersection Observer API
- Returns ref to attach to elements and visibility state
- Configurable threshold and trigger behavior

#### useParallax Hook

```typescript
interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
}

function useParallax(options?: ParallaxOptions): {
  ref: RefObject<HTMLElement>;
  transform: string;
}
```

**Purpose**: Create subtle parallax effects on scroll

**Implementation**:
- Tracks scroll position using scroll event listeners
- Calculates transform values based on scroll offset
- Optimized with requestAnimationFrame

### 2. Enhanced Navigation Component

**Updates to `components/Navigation.tsx`**:

- Add smooth scroll behavior when clicking navigation items
- Enhance active state highlighting with animated underline
- Improve mobile menu animation with slide-in effect
- Add keyboard navigation support with focus management
- Add PICABORD company logo on the leftmost side

**New Features**:
```typescript
interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  enableSmoothScroll?: boolean; // New prop
}
```

**Logo Integration**:
- Display logo image from `public/PIC-A-BOARD_logo_w.png`
- Position logo to the left of "PICABORD" text
- Scale appropriately: 32px height on desktop, 24px on mobile
- Add proper alt text for accessibility
- Ensure logo works in both light and dark themes

### 3. Form Enhancement System

#### Toast Notification Component

```typescript
interface ToastProps {
  title: string;
  description?: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}
```

**Purpose**: Provide user feedback for form submissions and actions

**Implementation**:
- Use Radix UI Toast primitive
- Auto-dismiss after configurable duration
- Support for multiple simultaneous toasts
- Accessible with ARIA live regions

#### Enhanced Contact Form

**Updates to `pages/Contact.tsx`**:

- Integrate React Hook Form for form state management
- Add Zod schema validation
- Implement real-time field validation
- Add loading states during submission
- Show success/error toasts after submission

```typescript
interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});
```

### 4. Loading States

#### Button Loading State

**Enhancement to `components/ui/button.tsx`**:

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}
```

**Features**:
- Show spinner icon when loading
- Disable button during loading
- Optional loading text override

#### Skeleton Loader Component

```typescript
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave';
}
```

**Purpose**: Show placeholder content while data loads

**Implementation**:
- Reusable skeleton component with variants
- Pulse or wave animation options
- Matches card and content dimensions

### 5. Responsive Design Enhancements

**Mobile-First Breakpoint Strategy**:

```css
/* Tailwind breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

**Component-Specific Responsive Updates**:

- **Hero**: Stack content vertically on mobile, reduce text sizes
- **CompanyOverview**: Single column cards on mobile
- **DivisionsSection**: Single column on mobile, 2 columns on tablet, 3+ on desktop
- **Navigation**: Hamburger menu below md breakpoint
- **Footer**: Stack footer sections vertically on mobile

### 6. Custom SVG Icon System

**Purpose**: Replace all lucide-react icons with custom-designed SVG icons that match the PICABORD brand identity

**Design Principles**:
- Geometric shapes with clean lines
- Use accent colors from aurora theme (chart-1, chart-2, primary)
- Consistent stroke width and sizing
- Support for gradients and multi-color designs
- Inspired by modern minimalist icon design

**Icon Components Structure**:

```typescript
interface CustomIconProps {
  className?: string;
  size?: number;
  colors?: {
    primary?: string;
    secondary?: string;
  };
}

// Example: Custom Target Icon
function TargetIcon({ className, size = 24, colors }: CustomIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      className={className}
    >
      {/* Custom SVG paths with gradients */}
    </svg>
  );
}
```

**Icons to Create**:

Based on current usage in components:
1. **Target Icon** - For mission/precision (CompanyOverview, About)
2. **Zap Icon** - For innovation/energy (CompanyOverview, PIKA)
3. **Users Icon** - For collaboration/team (CompanyOverview, About)
4. **Globe Icon** - For global impact (CompanyOverview, About)
5. **Cpu Icon** - For embedded systems (CompanyOverview, PIKA)
6. **Brain Icon** - For AI/intelligence (CompanyOverview)
7. **Rocket Icon** - For future/innovation (CompanyOverview)
8. **Shield Icon** - For security (PIKA)
9. **Wifi Icon** - For connectivity (PIKA)
10. **Database Icon** - For storage (PIKA)
11. **Thermometer Icon** - For industrial grade (PIKA)
12. **Award Icon** - For values/excellence (About)

**Implementation Approach**:
- Create separate component file: `components/icons/custom-icons.tsx`
- Export all custom icons from single file
- Use Tailwind classes for colors via className prop
- Support gradient fills using SVG linearGradient definitions
- Ensure icons are accessible with title and desc elements

**Example Custom Icon Design**:

```typescript
export function CustomTargetIcon({ className, size = 24 }: CustomIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Target icon"
    >
      <defs>
        <linearGradient id="targetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--chart-1))" />
          <stop offset="100%" stopColor="hsl(var(--primary))" />
        </linearGradient>
      </defs>
      {/* Outer circle */}
      <circle cx="12" cy="12" r="10" stroke="url(#targetGradient)" strokeWidth="2" />
      {/* Middle circle */}
      <circle cx="12" cy="12" r="6" stroke="url(#targetGradient)" strokeWidth="2" />
      {/* Center dot */}
      <circle cx="12" cy="12" r="2" fill="url(#targetGradient)" />
    </svg>
  );
}
```

### 7. Accessibility Enhancements

#### Focus Management

**Implementation**:
- Add visible focus rings to all interactive elements
- Use Tailwind's `focus-visible` utilities
- Ensure focus order follows logical tab sequence

```css
.focus-visible:focus {
  @apply ring-2 ring-primary ring-offset-2 ring-offset-background;
}
```

#### ARIA Labels

**Updates Required**:
- Add `aria-label` to icon-only buttons
- Add `aria-current="page"` to active navigation items
- Add `aria-live` regions for dynamic content updates
- Add `role` attributes where semantic HTML isn't sufficient
- Add title and desc elements to custom SVG icons

#### Color Contrast

**Audit and Fix**:
- Ensure all text meets WCAG AA standards (4.5:1 for normal, 3:1 for large)
- Test both light and dark themes
- Adjust muted-foreground colors if needed
- Ensure custom icon colors have sufficient contrast

## Data Models

### Animation State

```typescript
interface AnimationState {
  isVisible: boolean;
  hasAnimated: boolean;
  delay?: number;
}
```

### Form State

```typescript
interface FormState<T> {
  data: T;
  errors: Record<keyof T, string>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
}
```

### Toast State

```typescript
interface ToastState {
  id: string;
  title: string;
  description?: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  duration: number;
  isVisible: boolean;
}
```

## Error Handling

### Form Validation Errors

**Strategy**:
- Display inline error messages below form fields
- Show field-specific errors in red text
- Highlight invalid fields with red border
- Prevent submission until all errors are resolved

### Network Errors

**Strategy**:
- Show error toast for failed form submissions
- Provide retry mechanism
- Log errors to console for debugging
- Graceful degradation for missing data

### Animation Errors

**Strategy**:
- Wrap animation code in try-catch blocks
- Fall back to no animation if errors occur
- Ensure page remains functional without animations

## Testing Strategy

### Unit Tests

**Components to Test**:
- `useScrollAnimation` hook behavior
- `useParallax` hook calculations
- Form validation logic
- Toast notification lifecycle

**Testing Approach**:
- Use React Testing Library
- Mock Intersection Observer API
- Test edge cases and error states

### Integration Tests

**Scenarios to Test**:
- Form submission flow (success and error paths)
- Navigation between sections
- Mobile menu interactions
- Theme switching with animations

### Accessibility Tests

**Tools**:
- axe-core for automated accessibility testing
- Manual keyboard navigation testing
- Screen reader testing (NVDA/JAWS)
- Color contrast analyzer

### Visual Regression Tests

**Approach**:
- Capture screenshots of key pages
- Test responsive breakpoints
- Verify animations don't break layouts
- Test both light and dark themes

## Implementation Phases

### Phase 1: Foundation (Animations & Utilities)

1. Install dependencies (Framer Motion, React Hook Form, Zod)
2. Create `useScrollAnimation` hook
3. Create `useParallax` hook
4. Add custom Tailwind animation utilities
5. Test hooks in isolation

### Phase 2: Component Enhancements

1. Update Navigation component with smooth scroll
2. Enhance Hero with parallax effect
3. Add scroll animations to CompanyOverview
4. Update card components with hover effects
5. Test component updates

### Phase 3: Form Improvements

1. Create Toast component
2. Integrate React Hook Form in Contact page
3. Add Zod validation schema
4. Implement loading states
5. Add success/error feedback
6. Test form flow end-to-end

### Phase 4: Loading States

1. Enhance Button component with loading prop
2. Create Skeleton loader component
3. Add loading states to async operations
4. Test loading indicators

### Phase 5: Responsive & Accessibility

1. Audit and fix mobile responsiveness issues
2. Add ARIA labels to all interactive elements
3. Implement focus management
4. Test color contrast ratios
5. Conduct keyboard navigation testing
6. Test with screen readers

### Phase 6: Polish & Optimization

1. Fine-tune animation timings
2. Optimize performance (lazy loading, code splitting)
3. Cross-browser testing
4. Final accessibility audit
5. Documentation updates

## Performance Considerations

### Animation Performance

- Use CSS transforms and opacity for animations (GPU-accelerated)
- Implement `will-change` property sparingly
- Use `requestAnimationFrame` for scroll-based animations
- Debounce scroll event listeners
- Suspend animations when elements are off-screen

### Code Splitting

- Lazy load Framer Motion only where needed
- Code-split form validation libraries
- Defer non-critical animations

### Bundle Size

- Tree-shake unused Framer Motion features
- Use lightweight alternatives where possible
- Monitor bundle size with each change

## Browser Compatibility

**Target Browsers**:
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

**Fallbacks**:
- Intersection Observer polyfill for older browsers
- CSS Grid fallbacks for IE11 (if required)
- Graceful degradation for animations

## Design System Consistency

### Spacing Scale

**Enforce consistent spacing**:
- Section padding: `py-16` or `py-24`
- Component gaps: `gap-4`, `gap-6`, `gap-8`
- Card padding: `p-6` or `p-8`
- Button padding: `px-4 py-2` (sm), `px-6 py-3` (md), `px-8 py-4` (lg)

### Typography Scale

**Standardize heading sizes**:
- H1: `text-4xl md:text-6xl` (Hero), `text-3xl md:text-5xl` (Pages)
- H2: `text-3xl md:text-4xl` (Section headers)
- H3: `text-xl md:text-2xl` (Subsections)
- Body: `text-base` (16px minimum)
- Small: `text-sm`

### Color Usage

**Aurora theme application**:
- Primary actions: `bg-gradient-to-r from-chart-1 to-primary`
- Hover states: Lighten/darken by 10%
- Borders: `border-primary/30` for subtle, `border-primary` for emphasis
- Backgrounds: `bg-gradient-to-br from-background to-muted/20`

### Animation Timing

**Consistent durations**:
- Micro-interactions: 150-200ms
- Component transitions: 300ms
- Page transitions: 500ms
- Parallax: Continuous, 0.3 speed ratio

## Security Considerations

### Form Submissions

- Sanitize all user inputs before processing
- Implement rate limiting on form submissions
- Add CSRF protection
- Validate on both client and server side

### XSS Prevention

- Use React's built-in XSS protection
- Avoid `dangerouslySetInnerHTML`
- Sanitize any user-generated content

## Maintenance and Documentation

### Code Documentation

- Add JSDoc comments to all hooks and utilities
- Document prop interfaces with descriptions
- Include usage examples in component files

### Style Guide Updates

- Update design_guidelines.md with new patterns
- Document animation standards
- Add accessibility guidelines

### Component Library

- Create Storybook stories for new components
- Document component variants and states
- Provide usage examples
