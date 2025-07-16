// src/components/LoadGLB.tsx
'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
// @ts-ignore
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// @ts-ignore
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

export default function LoadGLB() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 🔧 Setup basic scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 350)
    camera.position.set(0, 1.5, 4)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true

    mountRef.current?.appendChild(renderer.domElement)

    // 💡 Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0)
    directionalLight.position.set(5, 10, 7)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    // 🎯 Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 1, 0)
    controls.update()

    // Draco Loader
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/') // ⬅️ ini penting!

    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)

    // 📦 Load GLB model
    // const loader = new GLTFLoader()
    loader.load('/landrover.glb', (gltf: GLTF) => {
    const model = gltf.scene
    scene.add(model)
    })

    // 🔁 Animate
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    // 🧹 Cleanup
    return () => {
      renderer.dispose()
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
}
