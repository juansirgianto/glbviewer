'use client'

import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

const Model = dynamic(() => import('./Model'), { ssr: false })

export default function FerrariScene() {
  return (
    
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas shadows camera={{ position: [0, 2, 6], fov: 45 }}>
  {/* 🎨 Background putih studio */}
  <color attach="background" args={['#ffffff']} />

  {/* 🌫️ Fog (opsional) */}
  {/* <fog attach="fog" args={['#ffffff', 10, 15]} /> */}

  {/* 🌅 HDRI untuk pencahayaan reflektif */}
  <Environment files="/venice_sunset_1k.hdr" />

  {/* 💡 Studio lighting */}
  {/* <ambientLight intensity={0.4} /> */}
  <spotLight
    position={[5, 5, 5]}
    angle={0.3}
    penumbra={1}
    intensity={1.5}
    castShadow
    shadow-mapSize-width={2048}
    shadow-mapSize-height={2048}
  />

  {/* 🔄 Orbit + Model */}
  <OrbitControls target={[0, 0.7, 0]} />
  <Model />
</Canvas>

    </div>
  )
}
