'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useEffect } from 'react';

interface CircuitViewerProps {
  modelPath: string;
  className?: string;
  cameraPosition?: [number, number, number];
  autoRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  minDistance?: number;
  maxDistance?: number;
  scale?: number;
}

function LoadingPlaceholder() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#888888" wireframe />
    </mesh>
  );
}

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

function Model({ modelPath, scale = 1 }: { modelPath: string; scale?: number }) {
  const { scene } = useGLTF(modelPath);
  
  useEffect(() => {
    return () => {
      // Cleanup resources on unmount
      scene.traverse((object: any) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material: any) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [scene]);
  
  return <primitive object={scene} scale={scale} />;
}

export default function CircuitViewer({
  modelPath,
  className = '',
  cameraPosition = [3, 2, 5],
  autoRotate = false,
  enableZoom = true,
  enablePan = false,
  minDistance = 2,
  maxDistance = 10,
  scale = 1
}: CircuitViewerProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={cameraPosition} fov={45} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <hemisphereLight intensity={0.3} />
        
        <Suspense fallback={<LoadingPlaceholder />}>
          <Model modelPath={modelPath} scale={scale} />
        </Suspense>
        
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          enableZoom={enableZoom}
          enablePan={enablePan}
          minDistance={minDistance}
          maxDistance={maxDistance}
        />
      </Canvas>
    </div>
  );
}
