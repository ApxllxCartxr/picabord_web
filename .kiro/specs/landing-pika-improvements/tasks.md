k# Implementation Plan

- [x] 1. Install Three.js dependencies


  - Add three, @react-three/fiber, and @react-three/drei packages to package.json
  - Add @types/three to devDependencies for TypeScript support
  - Run npm install to install the new packages
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [x] 2. Update landing page typography and remove division names


  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 2.1 Reduce font sizes in Mission Section


  - Modify the paragraph in Mission Section from `text-xl md:text-2xl lg:text-3xl` to `text-base md:text-lg lg:text-xl xl:text-2xl`
  - Add `text-justify` class to the Mission Section paragraph
  - _Requirements: 1.1, 1.2, 1.4_

- [x] 2.2 Reduce font sizes and add justification in Solutions Section


  - Change Hardware and Software card headings from `text-4xl md:text-5xl` to `text-3xl md:text-4xl`
  - Change card description paragraphs from `text-lg` to `text-sm md:text-base`
  - Add `text-justify` class to both Hardware and Software card description paragraphs
  - _Requirements: 1.3, 1.5_

- [x] 2.3 Remove division name references

  - Remove the `<p className="text-sm text-primary font-medium">PIKA Division</p>` line from the Hardware card
  - Remove the `<p className="text-sm text-primary font-medium">TEC Division</p>` line from the Software card
  - Verify that href="/pika" and href="/tec" links remain intact
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 3. Create CircuitViewer component


  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [x] 3.1 Create base CircuitViewer component structure


  - Create new file components/CircuitViewer.tsx
  - Define CircuitViewerProps interface with modelPath, className, cameraPosition, autoRotate, enableZoom, enablePan, minDistance, and maxDistance properties
  - Set up Canvas component from @react-three/fiber
  - Configure PerspectiveCamera with position [3, 2, 5] and FOV 45
  - _Requirements: 4.1, 4.5_

- [x] 3.2 Implement 3D model loading and rendering

  - Create Model sub-component that uses useGLTF hook from @react-three/drei
  - Load circuit.glb model using the modelPath prop
  - Wrap Model component in Suspense with loading placeholder
  - Add primitive object to render the loaded scene
  - _Requirements: 4.1, 4.5_

- [x] 3.3 Add lighting configuration

  - Add ambientLight with intensity 0.4
  - Add directionalLight at position [5, 5, 5] with intensity 0.8
  - Add hemisphereLight with intensity 0.3
  - _Requirements: 4.5_

- [x] 3.4 Implement OrbitControls for interaction

  - Add OrbitControls component from @react-three/drei
  - Enable damping with dampingFactor 0.05
  - Configure autoRotate, enableZoom, minDistance, and maxDistance from props
  - Set autoRotateSpeed to 0.5
  - _Requirements: 4.2, 4.3, 4.4_

- [x] 3.5 Add error handling and fallback UI

  - Create ErrorFallback component for model load failures
  - Implement error boundary around Model component
  - Add loading state indicator
  - Handle WebGL not supported scenario
  - _Requirements: 4.6_

- [x] 3.6 Implement resource cleanup

  - Add proper disposal of Three.js resources on component unmount
  - Use useEffect cleanup function to dispose of scene objects
  - Prevent memory leaks by cleaning up geometries, materials, and textures
  - _Requirements: 4.7_

- [x] 4. Redesign PIKA page with new content


  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 4.1 Update PIKA page hero section


  - Modify pages/PIKA.tsx to update the title to "PIKA-1"
  - Add subtitle "India's First Modular AI-Enabled Single Board Computer"
  - Replace the existing product image section with CircuitViewer component
  - Set up two-column grid layout (content left, 3D viewer right) on desktop
  - Make layout stack vertically on mobile
  - _Requirements: 3.1, 3.5_

- [x] 4.2 Add product description section

  - Create new section below hero with the product description content
  - Apply `text-justify` class to the description paragraph
  - Use Card component with appropriate styling to match existing design
  - Maintain color scheme with gradient patterns and border colors
  - _Requirements: 3.2, 3.4, 3.5_

- [x] 4.3 Add target market and use cases section

  - Create section with target market description content
  - Apply `text-justify` class to the paragraph
  - Use consistent card styling and spacing
  - Maintain existing color tokens and hover effects
  - _Requirements: 3.3, 3.4, 3.5_

- [x] 4.4 Integrate CircuitViewer into PIKA page

  - Import CircuitViewer component
  - Add CircuitViewer with modelPath="/circuit.glb" in the hero section
  - Set appropriate height (h-64 or h-96) for the viewer container
  - Configure camera position and controls for optimal viewing
  - Add className for responsive sizing
  - _Requirements: 3.1, 3.5, 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 5. Test and validate implementation



  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [x] 5.1 Verify landing page changes


  - Check that Mission Section font sizes are reduced by 4 points
  - Verify Solutions Section font sizes are reduced by 4 points
  - Confirm text justification is applied to all paragraphs
  - Verify division names are removed but links still work
  - Test navigation to /pika and /tec routes
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 5.2 Test CircuitViewer functionality

  - Verify 3D model loads and displays correctly
  - Test mouse drag rotation on desktop
  - Test scroll wheel zoom functionality
  - Test touch gestures on mobile (rotation and pinch zoom)
  - Verify error handling when model fails to load
  - Check that resources are properly cleaned up on unmount
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [x] 5.3 Validate PIKA page redesign

  - Verify new content is displayed with correct text
  - Check that all text is justified
  - Confirm color scheme matches existing design
  - Test CircuitViewer integration in hero section
  - Verify responsive layout on mobile and desktop
  - Check that back button and other interactions work
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ]* 5.4 Run diagnostics and fix any issues
  - Run getDiagnostics on modified files
  - Fix any TypeScript errors or warnings
  - Verify no console errors in browser
  - Check accessibility with keyboard navigation
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_
