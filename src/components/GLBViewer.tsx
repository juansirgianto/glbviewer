// src/components/GLBViewer.tsx
'use client'

import { JSX, useEffect, useRef, useState } from 'react'
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
  partColors: Record<string, string>
  onSelectMaterial?: (name: string) => void
}

export default function GLBViewer({
  bodyColor,
  detailsColor,
  glassColor,
  partColors,
  onSelectMaterial
}: GLBViewerProps)
{
  const mountRef = useRef<HTMLDivElement>(null)
  const materialsRef = useRef<{
  body?: THREE.MeshPhysicalMaterial
  details?: THREE.MeshStandardMaterial
  glass?: THREE.MeshPhysicalMaterial
  [key: string]: THREE.MeshPhysicalMaterial | THREE.MeshStandardMaterial | undefined
  }>({})
  const sceneRef = useRef<THREE.Scene | null>(null)
  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0, z: 0 })

  const highlightableMeshes = new Set([
  'glass_headlight',
  'carpaint_door_FL_doorLayer',
  'carpaint_door_RL_doorLayer',
  'carpaint_fenders_r',
  'carpaint_trunk',
  'carpaint_door_RR_doorLayer',
  'carpaint_door_FR_doorLayer',
  'carpaint_fenders_f',
  'carpaint_hood',
  'carpaint_windshield',
  'glassDark_windshield',
])

  useEffect(() => {
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0xffffff)

    // axis helper
    const axesHelper = new THREE.AxesHelper(2) // ukuran 2 unit
    scene.add(axesHelper)

    // Load HDR Environment
    const rgbeLoader = new RGBELoader()
    rgbeLoader.load('/hdr/studio.hdr', (texture: THREE.DataTexture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      scene.environment = texture
    })

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 350)
    camera.position.set(8, 0.3, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    mountRef.current?.appendChild(renderer.domElement)

    // environment intensity
    renderer.toneMapping = THREE.NoToneMapping
    // renderer.toneMapping = THREE.ACESFilmicToneMapping
    // renderer.toneMappingExposure = 0.5

    // const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    // ambientLight.position.set(5.4, 2.1, 7.5)
    // scene.add(ambientLight)

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 15.0)
    // directionalLight.position.set(0, 5, 0)
    // directionalLight.castShadow = true
    // scene.add(directionalLight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 1, 0)
    controls.update()

    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()

    function onPointerDown(event: MouseEvent) {
  const rect = renderer.domElement.getBoundingClientRect()
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(pointer, camera)
  const intersects = raycaster.intersectObjects(scene.children, true)

  if (intersects.length > 0) {
    const mesh = intersects[0].object as THREE.Mesh
    const name = mesh.name || mesh.parent?.name

    if (typeof name === 'string') {
      onSelectMaterial?.(name)
    }
  }
}
    renderer.domElement.addEventListener('pointerdown', onPointerDown)

let hoveredMesh: THREE.Mesh | null = null
let originalColor: THREE.Color | null = null

function onPointerMove(event: MouseEvent) {
  const rect = renderer.domElement.getBoundingClientRect()
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(pointer, camera)
  const intersects = raycaster.intersectObjects(scene.children, true)

  if (intersects.length > 0) {
    const mesh = intersects[0].object as THREE.Mesh
    const name = mesh.name || mesh.parent?.name

    if (name && highlightableMeshes.has(name)) {
      renderer.domElement.style.cursor = 'pointer'

      if (hoveredMesh !== mesh) {
        if (hoveredMesh && originalColor) {
          (hoveredMesh.material as THREE.MeshStandardMaterial).color.copy(originalColor)
        }

        hoveredMesh = mesh
        originalColor = (mesh.material as THREE.MeshStandardMaterial).color.clone()
        const highlightedColor = originalColor.clone().multiplyScalar(0.3)
        ;(mesh.material as THREE.MeshStandardMaterial).color.copy(highlightedColor)
      }

      return
    }
  }

  renderer.domElement.style.cursor = 'default'

  if (hoveredMesh && originalColor) {
    ;(hoveredMesh.material as THREE.MeshStandardMaterial).color.copy(originalColor)
    hoveredMesh = null
    originalColor = null
  }
}

renderer.domElement.addEventListener('pointermove', onPointerMove)

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)

    loader.load('/ford.glb', (gltf: GLTF) => {
  const carModel = gltf.scene.children[0] as THREE.Object3D

  // Buat dan simpan material
  const bodyMaterial = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(bodyColor), metalness: 1, roughness: 0.5, clearcoat: 1, clearcoatRoughness: 0.03 })
  const glassMaterial = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(glassColor), metalness: 0.25, roughness: 0, transmission: 1, transparent: true, opacity: 0.5 })

  // Buat material details untuk setiap mesh (agar bisa diubah satu per satu)
  const detailNames = [
    'carpaint_door_FL_doorLayer',
    'carpaint_door_RL_doorLayer',
    'carpaint_fenders_r',
    'carpaint_trunk',
    'carpaint_door_RR_doorLayer',
    'carpaint_door_FR_doorLayer',
    'carpaint_fenders_f',
    'carpaint_hood',
    'carpaint_windshield',
  ]

  materialsRef.current = {
  body: bodyMaterial,
  glass: glassMaterial,
  ...materialsRef.current // jaga-jaga agar tidak hilang saat rerender
}

detailNames.forEach(name => {
  const part = carModel.getObjectByName(name) as THREE.Mesh
  if (part) {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(detailsColor),
      metalness: 1,
      roughness: 0.5,
      clearcoat: 1,
      clearcoatRoughness: 0.03
    })
    part.material = mat
    part.userData.isDetail = true
    materialsRef.current[name] = mat // <== simpan referensi material berdasarkan nama
  }
})

  // Tambahan
  const Glass = carModel.getObjectByName('glassDark_windshield') as THREE.Mesh
  if (Glass) Glass.material = glassMaterial

  const Headlight = carModel.getObjectByName('glass_headlight') as THREE.Mesh
  if (Headlight) Headlight.material = bodyMaterial

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
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      renderer.domElement.removeEventListener('pointermove', onPointerMove)
      renderer.dispose()
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

 useEffect(() => {
  sceneRef.current?.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      const color = partColors[mesh.name]
      if (color) {
        const mat = mesh.material as THREE.MeshStandardMaterial
        mat.color.set(color)
      }
    }
  })
}, [partColors])

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
