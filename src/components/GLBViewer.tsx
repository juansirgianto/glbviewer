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
import { useRouter } from 'next/router'

interface GLBViewerProps {
  bodyColor: string
  detailsColor: string
  glassColor: string
  partColors: Record<string, string>
  detailsRim: string
  partMode: Record<string, 'color' | 'texture'>
  meshDescriptions: Record<
    string,
    (
      color: string,
      setColor: (v: string) => void,
      mode: "color" | "texture",
      setMode: (v: "color" | "texture") => void,
      applyTexture?: (part: string, texPath: string) => void
    ) => JSX.Element
  >
  onSelectMaterial?: (name: string | null) => void
}

function createTriplanarMaterial(texture: THREE.Texture, scale: number = 4.0) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  return new THREE.ShaderMaterial({
    uniforms: {
      map: { value: texture },
      scale: { value: scale }
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float scale;
      varying vec3 vWorldPosition;

      vec4 sampleTriplanar(vec3 pos) {
        vec3 scaled = pos * scale;
        vec2 uvX = scaled.yz;
        vec2 uvY = scaled.zx;
        vec2 uvZ = scaled.xy;
        vec4 xSample = texture2D(map, uvX);
        vec4 ySample = texture2D(map, uvY);
        vec4 zSample = texture2D(map, uvZ);
        return (xSample + ySample + zSample) / 3.0;
      }

      void main() {
        gl_FragColor = sampleTriplanar(vWorldPosition);
      }
    `
  })
}

export default function GLBViewer({
  bodyColor,
  detailsColor,
  glassColor,
  partColors,
  detailsRim,
  partMode,
  onSelectMaterial
}: GLBViewerProps)
{
  const mountRef = useRef<HTMLDivElement>(null)
  const materialsRef = useRef<Record<string, THREE.Material | undefined>>({})

  const sceneRef = useRef<THREE.Scene | null>(null)
  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0, z: 0 })

  const [progress, setProgress] = useState(0)
const [isLoading, setIsLoading] = useState(true)

const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
  setProgress(0)
  setIsLoading(true)
}

loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  const percent = (itemsLoaded / itemsTotal) * 100
  setProgress(Math.round(percent))
}

loadingManager.onLoad = () => {
  setProgress(100)
  setIsLoading(false)
}

loadingManager.onError = (url) => {
  console.error(`Error loading: ${url}`)
}

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
  'rimDark_000_wheelsLayer',
  'rimDark_001_wheelsLayer',
  'rimDark_002_wheelsLayer',
  'rimDark_003_wheelsLayer',
])

  useEffect(() => {
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0x888888)

    // axis helper
    // const axesHelper = new THREE.AxesHelper(2) // ukuran 2 unit
    // scene.add(axesHelper)

    // Load HDR Environment
    const rgbeLoader = new RGBELoader()
    rgbeLoader.load(`/glbviewer/hdr/studio.hdr`, (texture: THREE.DataTexture) => {
    // rgbeLoader.load(`/hdr/studio.hdr`, (texture: THREE.DataTexture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      scene.environment = texture
    })

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 350)

    // Deteksi mobile: layar ≤ 768px
    const isMobile = window.innerWidth <= 768

    if (isMobile) {
      // Kamera lebih jauh saat mobile
      camera.position.set(8.96, 0.8, 0) // jarak lebih jauh
    } else {
      // Default desktop
      camera.position.set(4.28, 1.24, -4.08)
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    mountRef.current?.appendChild(renderer.domElement)

    // environment intensity
    renderer.toneMapping = THREE.NoToneMapping
    // renderer.toneMapping = THREE.ACESFilmicToneMapping
    // renderer.toneMappingExposure = 0.5

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    ambientLight.position.set(5.4, 2.1, 7.5)
    scene.add(ambientLight)

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 15.0)
    // directionalLight.position.set(0, 5, 0)
    // directionalLight.castShadow = true
    // scene.add(directionalLight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.maxDistance = 11
    // Update cursor saat mulai drag
    controls.addEventListener('start', () => {
      if (mountRef.current) {
        mountRef.current.style.cursor = 'grabbing'
      }
    })

    // Update cursor saat selesai drag
    controls.addEventListener('end', () => {
      if (mountRef.current) {
        mountRef.current.style.cursor = 'grab'
      }
    })

    controls.target.set(0, 0, 0)
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
          return
        }
      }
      // klik kosong → tutup panel
      onSelectMaterial?.(null)
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
      mountRef.current!.style.cursor = 'pointer'

      // Reset warna mesh sebelumnya
      if (hoveredMesh && originalColor) {
        const mat = hoveredMesh.material as THREE.Material
        if ('color' in mat && mat.color instanceof THREE.Color) {
          mat.color.copy(originalColor)
        }
      }

      // Simpan mesh dan warnanya
      hoveredMesh = mesh
      const mat = mesh.material as THREE.Material
      if ('color' in mat && mat.color instanceof THREE.Color) {
        originalColor = mat.color.clone()
        const highlightedColor = originalColor.clone().multiplyScalar(0.3)
        mat.color.copy(highlightedColor)
      } else {
        originalColor = null
      }

      return
    }
  }

  // Reset cursor & warna
  mountRef.current!.style.cursor = 'grab'
  if (hoveredMesh && originalColor) {
    const mat = hoveredMesh.material as THREE.Material
    if ('color' in mat && mat.color instanceof THREE.Color) {
      mat.color.copy(originalColor)
    }
  }

  hoveredMesh = null
  originalColor = null
}

renderer.domElement.addEventListener('pointermove', onPointerMove)

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/glbviewer/draco/')
    // dracoLoader.setDecoderPath('/draco/')
    const loader = new GLTFLoader(loadingManager)
    loader.setDRACOLoader(dracoLoader)

    loader.load(`/glbviewer/ford_v2.glb`, (gltf: GLTF) => {
    // loader.load(`/ford_v2.glb`, (gltf: GLTF) => {
  const carModel = gltf.scene.children[0] as THREE.Object3D

  // Buat dan simpan material
  const bodyMaterial = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(bodyColor), metalness: 0.25, roughness: 0, transparent: true, opacity: 0.5 })
  const glassMaterial = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(glassColor), metalness: 0.5, roughness: 0.2, transmission: 1, transparent: true, opacity: 0.5 })
  const tiresMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#222222'),
    metalness: 0,
    roughness: 0.9,
    clearcoat: 0.0,
    clearcoatRoughness: 0.0,
    reflectivity: 0.05,
    sheen: 0.1,
    side: THREE.FrontSide
  })

  materialsRef.current = {
  body: bodyMaterial,
  glass: glassMaterial,
  ...materialsRef.current // jaga-jaga agar tidak hilang saat rerender
}

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
    'carpaint_handle_door_fl_doorLayer',
    'carpaint_handle_door_rl_doorLayer',
    'carpaint_handle_door_rr_doorLayer',
    'carpaint_handle_door_fr_doorLayer',
    'carpaint_door_r',
    'carpaint_sideskirts',
    'black_front',
    'carpaint_top_frame_interiorLayer',
  ]

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
      materialsRef.current[name] = mat
    }
  })

const detailRims = [
    'rimDark_000_wheelsLayer',
    'rimDark_001_wheelsLayer',
    'rimDark_002_wheelsLayer',
    'rimDark_003_wheelsLayer',
  ]

  detailRims.forEach(name => {
  const rim = carModel.getObjectByName(name) as THREE.Mesh
  if (rim) {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(detailsRim),
      metalness: 1,
      roughness: 0.2,
      clearcoat: 0.9,
      clearcoatRoughness: 0.03,
      reflectivity: 0.5,
      envMapIntensity: 1.0,
    })
    rim.material = mat
    rim.userData.isDetail = true
    materialsRef.current[name] = mat // <== simpan referensi material berdasarkan nama
  }
})

  // Tambahan
  const Glass = carModel.getObjectByName('glassDark_windshield') as THREE.Mesh
  if (Glass) Glass.material = glassMaterial

  const Tire = carModel.getObjectByName('tire_000_wheelsLayer') as THREE.Mesh
  if (Tire) Tire.material = tiresMaterial
  const Tire1 = carModel.getObjectByName('tire_001_wheelsLayer') as THREE.Mesh
  if (Tire1) Tire1.material = tiresMaterial
  const Tire2 = carModel.getObjectByName('tire_002_wheelsLayer') as THREE.Mesh
  if (Tire2) Tire2.material = tiresMaterial
  const Tire3 = carModel.getObjectByName('tire_003_wheelsLayer') as THREE.Mesh
  if (Tire3) Tire3.material = tiresMaterial
  const Tire4 = carModel.getObjectByName('tire_004_wheelsLayer') as THREE.Mesh
  if (Tire4) Tire4.material = tiresMaterial

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
  function handleApplyTexture(e: CustomEvent) {
    const { partName, texturePath } = e.detail
    const scene = sceneRef.current
    if (!scene) return

    const mesh = scene.getObjectByName(partName) as THREE.Mesh
    if (!mesh) return

    new THREE.TextureLoader().load(texturePath, (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      const mat = createTriplanarMaterial(texture, 5.0)
      mesh.material = mat
      materialsRef.current[partName] = mat
    })
  }

  window.addEventListener('apply-texture', handleApplyTexture as EventListener)

  return () => {
    window.removeEventListener('apply-texture', handleApplyTexture as EventListener)
  }
}, [])


 useEffect(() => {
  const DEFAULT_RIM_PARTS = [
  'rimDark_000_wheelsLayer',
  'rimDark_001_wheelsLayer',
  'rimDark_002_wheelsLayer',
  'rimDark_003_wheelsLayer',
]
  Object.entries(partMode).forEach(([name, mode]) => {
    const mesh = sceneRef.current?.getObjectByName(name) as THREE.Mesh
    if (!mesh) return

    if (mode === 'texture') {
      const texture = new THREE.TextureLoader().load('/glbviewer/texture/carbon.jpg')
      // const texture = new THREE.TextureLoader().load('/texture/metal.jpg')
      const mat = createTriplanarMaterial(texture, 5.0)
      mesh.material = mat
      materialsRef.current[name] = mat
    } else if (mode === 'color') {
      const isRim = DEFAULT_RIM_PARTS.includes(name)
      const color = partColors[name] || (isRim ? detailsRim : detailsColor)
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 1,
        roughness: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.03
      })
      mesh.material = mat
      materialsRef.current[name] = mat
    }
  })
}, [partMode, partColors])

  useEffect(() => {
    const DEFAULT_RIM_PARTS = [
  'rimDark_000_wheelsLayer',
  'rimDark_001_wheelsLayer',
  'rimDark_002_wheelsLayer',
  'rimDark_003_wheelsLayer',
]
  const bodyMat = materialsRef.current.body
  if (bodyMat && 'color' in bodyMat) {
    (bodyMat as any).color.set(bodyColor)
  }

  Object.entries(materialsRef.current).forEach(([name, mat]) => {
  const isRim = DEFAULT_RIM_PARTS.includes(name)

  if (
    mat &&
    !['body', 'glass'].includes(name) &&
    !isRim && // ⛔ hindari update rim di sini
    partMode[name] !== 'texture' &&
    'color' in mat &&
    mat.color instanceof THREE.Color
  ) {
    mat.color.set(detailsColor)
  }
})

  const glassMat = materialsRef.current.glass
  if (glassMat && 'color' in glassMat) {
    (glassMat as any).color.set(glassColor)
  }
}, [bodyColor, detailsColor, glassColor])

  return (
  <>
    <div ref={mountRef} style={{ width: '100vw', height: '100vh',cursor: 'grab' }} />
    {isLoading && (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-[#1D4075] px-5 py-3 text-white rounded-lg font-mono text-sm">
        Loading... {progress}%
        <div className="w-48 h-2 mt-2 bg-gray-300 rounded overflow-hidden">
          <div className="h-full bg-green-400 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
    )}
    {/* <div style={{
      position: 'absolute',
      bottom: 10,
      right: 10,
      background: 'rgba(0,0,0,0.6)',
      color: '#fff',
      padding: '8px',
      borderRadius: '4px',
      fontFamily: 'monospace',
      zIndex: 10
    }}>
      Camera: x={cameraPos.x} y={cameraPos.y} z={cameraPos.z}
    </div> */}
  </>
)

  
  
}
