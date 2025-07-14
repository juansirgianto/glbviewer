// src/components/GLBViewer.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
// @ts-ignore
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// @ts-ignore
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
// @ts-ignore
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

interface GLBViewerProps {
  bodyColor: string
  detailsColor: string
  glassColor: string
}

export default function GLBViewer({ bodyColor, detailsColor, glassColor }: GLBViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const materialsRef = useRef<{
    body?: THREE.MeshPhysicalMaterial
    details?: THREE.MeshStandardMaterial
    glass?: THREE.MeshPhysicalMaterial
  }>({})
  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0, z: 0 })

  useEffect(() => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    // axis helper
    const axesHelper = new THREE.AxesHelper(2) // ukuran 2 unit
    scene.add(axesHelper)

    // Load HDR Environment
    const rgbeLoader = new RGBELoader()
    // rgbeLoader.load('/hdr/studio.hdr', (texture: THREE.DataTexture) => {
    //   texture.mapping = THREE.EquirectangularReflectionMapping
    //   scene.environment = texture
    // })

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 350)
    camera.position.set(8, 1, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    mountRef.current?.appendChild(renderer.domElement)

    // environment intensity
    // renderer.toneMapping = THREE.ACESFilmicToneMapping
    // renderer.toneMappingExposure = 0.5

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    ambientLight.position.set(5.4, 2.1, 7.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 15.0)
    directionalLight.position.set(0, 5, 0)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 1, 0)
    controls.update()

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)

    loader.load('/ford.glb', (gltf: GLTF) => {
      const carModel = gltf.scene.children[0] as THREE.Object3D

      // Buat dan simpan material
      const bodyMaterial = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(bodyColor), metalness: 1, roughness: 0.5, clearcoat: 1, clearcoatRoughness: 0.03 })
      const detailsMaterial = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(detailsColor), metalness: 1, roughness: 0.5, clearcoat: 1, clearcoatRoughness: 0.03 })
      const glassMaterial = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(glassColor), metalness: 0.25, roughness: 0, transmission: 1, transparent: true, opacity: 0.5 })

      materialsRef.current = { body: bodyMaterial, details: detailsMaterial, glass: glassMaterial }

      const body = carModel.getObjectByName('glass_headlight')
        if (body && (body as THREE.Mesh).material) {
        (body as THREE.Mesh).material = bodyMaterial
        }
      const seat = carModel.getObjectByName('carpaint_door_FL_doorLayer') as THREE.Mesh
        if (seat) seat.material = detailsMaterial
      const rimFL = carModel.getObjectByName('carpaint_door_RL_doorLayer') as THREE.Mesh
        if (rimFL) rimFL.material = detailsMaterial
      const rimFR = carModel.getObjectByName('carpaint_fenders_r') as THREE.Mesh
        if (rimFR) rimFR.material = detailsMaterial
      const rimRR = carModel.getObjectByName('carpaint_trunk') as THREE.Mesh
        if (rimRR) rimRR.material = detailsMaterial
      const rimRL = carModel.getObjectByName('carpaint_door_RR_doorLayer') as THREE.Mesh
        if (rimRL) rimRL.material = detailsMaterial
      const Trim = carModel.getObjectByName('carpaint_door_FR_doorLayer') as THREE.Mesh
        if (Trim) Trim.material = detailsMaterial
      const Trim1 = carModel.getObjectByName('carpaint_fenders_f') as THREE.Mesh
        if (Trim1) Trim1.material = detailsMaterial
      const hood = carModel.getObjectByName('carpaint_hood') as THREE.Mesh
        if (hood) hood.material = detailsMaterial
      const wind = carModel.getObjectByName('carpaint_windshield') as THREE.Mesh
        if (wind) wind.material = detailsMaterial
      const Glass = carModel.getObjectByName('glassDark_windshield') as THREE.Mesh
        if (Glass) Glass.material = glassMaterial

      scene.add(carModel)
    })

    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)

      // Update posisi kamera ke state (1 kali per frame)
  setCameraPos({
    x: Number(camera.position.x.toFixed(2)),
    y: Number(camera.position.y.toFixed(2)),
    z: Number(camera.position.z.toFixed(2)),
  })
    }
    animate()

    return () => {
      renderer.dispose()
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  useEffect(() => {
    // Update warna saat props berubah
    materialsRef.current.body?.color.set(bodyColor)
    materialsRef.current.details?.color.set(detailsColor)
    materialsRef.current.glass?.color.set(glassColor)
  }, [bodyColor, detailsColor, glassColor])

  return (
  <>
    <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
    <div style={{
      position: 'absolute',
      top: 10,
      right: 10,
      background: 'rgba(0,0,0,0.6)',
      color: '#fff',
      padding: '8px',
      borderRadius: '4px',
      fontFamily: 'monospace',
      zIndex: 10
    }}>
      Camera: x={cameraPos.x} y={cameraPos.y} z={cameraPos.z}
    </div>
  </>
)

  
  
}
