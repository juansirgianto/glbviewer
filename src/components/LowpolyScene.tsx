'use client'

import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

const Model = dynamic(() => import('./Lowpoly'), { ssr: false })

export default function LowpolyScene() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        {/* Base light */}
        <ambientLight intensity={0.3} />

        {/* Directional "sunlight" */}
        <directionalLight
          position={[10, 10, 10]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Point light from above */}
        <pointLight position={[0, 5, 0]} intensity={0.5} />

        {/* Optional: Realistic environment lighting */}
        <Environment preset="sunset" />

        <OrbitControls />
        <Model />
      </Canvas>
    </div>
  )
}
