# Design Document

## Overview

This design document outlines the technical approach for implementing typography improvements to the landing page, removing division name references while maintaining navigation functionality, and creating a comprehensive redesign of the PIKA product page with an interactive 3D model viewer using Three.js.

The implementation will focus on:
1. Adjusting font sizes across the landing page for improved readability
2. Implementing text justification for better visual alignment
3. Removing "PIKA Division" and "TEC Division" labels while preserving links
4. Redesigning the PIKA page with new content and layout
5. Creating an interactive 3D viewer component for the circuit board model

## Architecture

### Component Structure

```
app/
├── page.tsx (Landing Page - modifications)
└── pika/
    └── page.tsx (PIKA Page wrapper)

pages/
└── PIKA.tsx (PIKA Page - complete redesign)

components/
├── CircuitViewer.tsx (NEW - Three.js 3D model viewer)
└── CascadingText.tsx (existing - no changes)

public/
└── circuit.glb (existing 3D model file)
```

### Technology Stack

- **React 18+**: Component framework
- **Next.js 14+**: Application framework with App Router
- **Three.js**: 3D graphics library for model rendering
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Helper components for react-three-fiber
- **Tailwind CSS**: Styling framework
- **TypeScript**: Type safety

## Components and Interfaces

### 1. Landing Page Typography Updates (app/page.tsx)

#### Changes Required

**Mission Section ("Who We Are")**
- Current heading uses `CascadingText` with `fontSize="responsive"`
- Current paragraph: `text-xl md:text-2xl lg:text-3xl`
- New paragraph: `text-base md:text-lg lg:text-xl xl:text-2xl` (4 points reduction)
- Add `text-justify` class to paragraph

**Solutions Section**
- Hardware/Software card headings: `text-4xl md:text-5xl` → `text-3xl md:text-4xl`
- Card descriptions: `text-lg` → `text-sm md:text-base`
- Add `text-justify` to description paragraphs
- Remove `<p className="text-sm text-primary font-medium">PIKA Division</p>` from Hardware card
- Remove `<p className="text-sm text-primary font-medium">TEC Division</p>` from Software card
- Maintain existing `href="/pika"` and `href="/tec"` links

### 2. PIKA Page Redesign (pages/PIKA.tsx)

#### New Layout Structure

```typescript
interface PIKAProps {
  onBack: () => void;
}

// Section breakdown:
// 1. Hero Section - Title, subtitle, and 3D viewer
// 2. Description Section - Product overview with justified text
// 3. Target Market Section - Use cases and applications
// 4. CTA Section - Contact/inquiry buttons
```

#### Hero Section Design

- **Title**: "PIKA-1" - Large, bold, primary color
- **Subtitle**: "India's First Modular AI-Enabled Single Board Computer" - Smaller, muted
- **3D Viewer**: Integrated CircuitViewer component displaying circuit.glb
- **Layout**: Two-column grid on desktop (content left, 3D viewer right), stacked on mobile

#### Content Sections

All paragraph text will use `text-justify` class for alignment. Content will be organized in cards with appropriate spacing and visual hierarchy.

**Product Description**:
```
PIKA-1 is a high-performance, compact single-board computer (SBC) designed by 
PICABORD to deliver versatility and efficiency in a small form factor. Engineered 
for developers, tech enthusiasts, and businesses, it combines robust processing 
power with low energy consumption, making it ideal for edge computing, IoT 
applications, AI prototyping, and embedded systems.
```

**Target Market & Use Cases**:
```
Its target market includes startups, educational institutions, makers, and 
enterprises seeking an affordable yet powerful computing platform for rapid 
development, automation, or experimentation. PIKA-1 can be used for home 
automation projects, robotics, industrial monitoring, AI/ML model deployment, 
digital signage, and lightweight server applications, providing a flexible 
foundation for innovative tech solutions.
```

#### Color Scheme Preservation

- Maintain existing gradient patterns: `from-chart-1 via-primary to-chart-2`
- Keep card styling: `border-primary/20`, `bg-gradient-to-br from-card to-card/50`
- Preserve hover effects: `hover-elevate`, `group-hover:opacity-100`
- Use existing color tokens from Tailwind config

### 3. CircuitViewer Component (NEW)

#### Component Interface

```typescript
interface CircuitViewerProps {
  modelPath: string;           // Path to .glb file
  className?: string;          // Additional CSS classes
  cameraPosition?: [number, number, number];  // Initial camera position
  autoRotate?: boolean;        // Enable auto-rotation
  enableZoom?: boolean;        // Enable zoom controls
  enablePan?: boolean;         // Enable pan controls
  minDistance?: number;        // Minimum zoom distance
  maxDistance?: number;        // Maximum zoom distance
}
```

#### Three.js Scene Configuration

**Camera Setup**:
- Type: PerspectiveCamera
- FOV: 45 degrees
- Initial position: [3, 2, 5] (adjustable)
- Look at: [0, 0, 0] (model center)

**Lighting**:
- Ambient light: 0.4 intensity (soft overall illumination)
- Directional light: 0.8 intensity, position [5, 5, 5] (main light source)
- Hemisphere light: 0.3 intensity (subtle fill light)

**Controls**:
- OrbitControls from @react-three/drei
- Enable damping for smooth movement
- Rotation: Mouse drag / touch drag
- Zoom: Mouse wheel / pinch gesture
- Pan: Right-click drag / two-finger drag (optional)
- Auto-rotate: Optional, slow rotation when idle

**Model Loading**:
- Use GLTFLoader via useGLTF hook from @react-three/drei
- Display loading state while model loads
- Error boundary for failed loads
- Proper disposal on unmount to prevent memory leaks

#### Implementation Pattern

```typescript
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';

function Model({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
}

export default function CircuitViewer({ 
  modelPath, 
  className = '',
  cameraPosition = [3, 2, 5],
  autoRotate = false,
  enableZoom = true,
  minDistance = 2,
  maxDistance = 10
}: CircuitViewerProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={cameraPosition} fov={45} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <hemisphereLight intensity={0.3} />
        
        <Suspense fallback={<LoadingPlaceholder />}>
          <Model modelPath={modelPath} />
        </Suspense>
        
        <OrbitControls 
          enableDamping
          dampingFactor={0.05}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          enableZoom={enableZoom}
          minDistance={minDistance}
          maxDistance={maxDistance}
        />
      </Canvas>
    </div>
  );
}
```

## Data Models

### CircuitViewer State

```typescript
interface ViewerState {
  isLoading: boolean;      // Model loading state
  hasError: boolean;       // Error state
  errorMessage?: string;   // Error details
}
```

### PIKA Page Content

```typescript
interface PIKAContent {
  title: string;
  subtitle: string;
  description: string;
  targetMarket: string;
  modelPath: string;
}

const pikaContent: PIKAContent = {
  title: "PIKA-1",
  subtitle: "India's First Modular AI-Enabled Single Board Computer",
  description: "PIKA-1 is a high-performance, compact single-board computer...",
  targetMarket: "Its target market includes startups, educational institutions...",
  modelPath: "/circuit.glb"
};
```

## Error Handling

### CircuitViewer Error States

1. **Model Load Failure**
   - Display fallback UI with error message
   - Provide retry mechanism
   - Log error to console for debugging

2. **WebGL Not Supported**
   - Detect WebGL availability
   - Show static image fallback
   - Display informative message to user

3. **Performance Issues**
   - Monitor frame rate
   - Reduce quality if needed (lower resolution, simpler lighting)
   - Provide option to disable auto-rotate

### Implementation

```typescript
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center h-full bg-muted/20 rounded-lg">
      <div className="text-center p-6">
        <p className="text-muted-foreground mb-2">
          Unable to load 3D model
        </p>
        <p className="text-sm text-muted-foreground/70">
          {error.message}
        </p>
      </div>
    </div>
  );
}
```

## Testing Strategy

### Unit Tests

1. **CircuitViewer Component**
   - Renders without crashing
   - Loads model successfully
   - Handles missing model path
   - Displays error state correctly
   - Cleans up resources on unmount

2. **PIKA Page**
   - Renders all content sections
   - Text is properly justified
   - Back button functions correctly
   - Analytics tracking fires on interactions

### Integration Tests

1. **Landing Page**
   - Font sizes are correctly reduced
   - Division names are removed
   - Links still navigate correctly
   - Text justification is applied

2. **3D Viewer Interactions**
   - Mouse drag rotates model
   - Scroll wheel zooms in/out
   - Touch gestures work on mobile
   - Controls are responsive

### Visual Regression Tests

1. Compare screenshots of:
   - Landing page mission section
   - Landing page solutions section
   - PIKA page hero section
   - PIKA page with 3D viewer

### Performance Tests

1. **3D Viewer Performance**
   - Frame rate maintains 60fps on desktop
   - Frame rate maintains 30fps on mobile
   - Memory usage stays within acceptable limits
   - Model loads within 3 seconds on average connection

### Accessibility Tests

1. **Keyboard Navigation**
   - All interactive elements are keyboard accessible
   - Focus indicators are visible
   - Tab order is logical

2. **Screen Reader Support**
   - Alternative text for 3D viewer
   - Proper heading hierarchy
   - ARIA labels where needed

## Dependencies

### New Package Requirements

```json
{
  "dependencies": {
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0"
  },
  "devDependencies": {
    "@types/three": "^0.160.0"
  }
}
```

### Existing Dependencies (No Changes)

- react
- next
- tailwindcss
- lucide-react
- @/components/ui/* (shadcn components)

## Implementation Notes

### Typography Adjustments

The font size reductions follow a consistent pattern:
- `text-3xl` → `text-2xl` (approximately 4 points)
- `text-2xl` → `text-xl` (approximately 4 points)
- `text-xl` → `text-base` (approximately 4 points)
- `text-lg` → `text-sm` (approximately 4 points)

Responsive breakpoints maintain the same relative size differences.

### Text Justification

Apply `text-justify` class to all paragraph elements containing body text. Headings and short text elements should remain left-aligned or center-aligned as appropriate.

### 3D Model Optimization

The circuit.glb file should be optimized for web delivery:
- Compressed geometry
- Optimized textures (if any)
- Reasonable polygon count (<100k triangles)
- File size under 5MB for fast loading

### Browser Compatibility

- Three.js requires WebGL support
- Fallback for browsers without WebGL
- Tested on: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile: iOS Safari 14+, Chrome Android 90+

### Performance Considerations

1. **Lazy Loading**: Load Three.js libraries only when CircuitViewer is rendered
2. **Code Splitting**: Use dynamic imports for the 3D viewer component
3. **Resource Cleanup**: Properly dispose of Three.js objects on unmount
4. **Responsive Rendering**: Adjust quality based on device capabilities

## Migration Path

1. Install Three.js dependencies
2. Create CircuitViewer component with basic functionality
3. Update landing page typography and remove division names
4. Redesign PIKA page layout and content
5. Integrate CircuitViewer into PIKA page
6. Test across devices and browsers
7. Optimize performance based on metrics
8. Deploy to production

## Future Enhancements

- Add hotspots to the 3D model for component information
- Implement model variants (different angles, exploded view)
- Add AR view capability for mobile devices
- Create interactive annotations on the circuit board
- Add comparison view with other SBC models
