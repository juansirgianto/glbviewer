// page.tsx

'use client'

import { JSX, useEffect, useRef, useState } from 'react'
import GLBViewer from '@/components/GLBViewer'
import { meshDescriptions } from '@/components/meshDescription'
import { useRouter } from 'next/router'
import './globals.css'

export default function Home() {
  const [bodyColor, setBodyColor] = useState('#ffffff')
  const [detailsColor, setDetailsColor] = useState('#004FA3')
  const [glassColor, setGlassColor] = useState('#ffffff')
  const [detailsRim, setDetailsRim] = useState('#888888') // warna default rim
  const [partColors, setPartColors] = useState<Record<string, string>>({})
  const [selectedPartName, setSelectedPartName] = useState<string | null>(null)
  const [rimMode, setRimMode] = useState<'color' | 'texture'>('color')
  const [partMode, setPartMode] = useState<Record<string, 'color' | 'texture'>>({
  carpaint_hood: 'color',
  rimDark_000_wheelsLayer: 'color',
  rimDark_001_wheelsLayer: 'color',
  rimDark_002_wheelsLayer: 'color',
  rimDark_003_wheelsLayer: 'color',
  carpaint_door_FL_doorLayer: 'color',
  carpaint_door_RL_doorLayer: 'color',
  carpaint_fenders_r: 'color',
  carpaint_trunk: 'color',
  carpaint_door_RR_doorLayer: 'color',
  carpaint_door_FR_doorLayer: 'color',
  carpaint_fenders_f: 'color',
  carpaint_windshield: 'color',
})

  const DEFAULT_BODY_COLOR = '#ffffff'
const DEFAULT_DETAILS_COLOR = '#004FA3'
const DEFAULT_GLASS_COLOR = '#ffffff'

const DEFAULT_GLASS_PARTS = [
  'glassDark_windshield',
]

const DEFAULT_RIM_PARTS = [
  'rimDark_000_wheelsLayer',
  'rimDark_001_wheelsLayer',
  'rimDark_002_wheelsLayer',
  'rimDark_003_wheelsLayer',
]

const DEFAULT_DETAIL_PARTS = [
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
  ]

const ALL_CUSTOMIZABLE_PARTS = [
  ...DEFAULT_DETAIL_PARTS,
  ...DEFAULT_RIM_PARTS,
]

function handleReset() {
  setBodyColor(DEFAULT_BODY_COLOR)
  setDetailsColor(DEFAULT_DETAILS_COLOR)
  setDetailsRim('#888888')
  setGlassColor(DEFAULT_GLASS_COLOR)
  setPartMode({ carpaint_hood: 'color' })
  setRimMode('color')

  // Reset warna semua part
  const resetPartColors: Record<string, string> = {}
  const resetPartMode: Record<string, 'color' | 'texture'> = {}

  ALL_CUSTOMIZABLE_PARTS.forEach((name) => {
    if (DEFAULT_RIM_PARTS.includes(name)) {
      resetPartColors[name] = '#888888'
    } else {
      resetPartColors[name] = DEFAULT_DETAILS_COLOR
    }

    // Semua kembali ke mode warna
    resetPartMode[name] = 'color'
  })

  setPartColors(resetPartColors)
  setPartMode(resetPartMode)
  setSelectedPartName(null)
}

  const prevDetailsColor = useRef(detailsColor)

// Untuk update warna detail parts
useEffect(() => {
  setPartColors((prev) => {
    const updated = { ...prev }
    DEFAULT_DETAIL_PARTS.forEach((name) => {
      updated[name] = detailsColor
    })
    return updated
  })
}, [detailsColor])

// Untuk update warna rim parts
useEffect(() => {
  setPartColors((prev) => {
    const updated = { ...prev }
    DEFAULT_RIM_PARTS.forEach((name) => {
      updated[name] = detailsRim
    })
    return updated
  })
}, [detailsRim])

  function handleSelect(name: string) {
  if (meshDescriptions[name]) {
    setSelectedPartName(name)
  } else {
    setSelectedPartName(null)
  }
}

function applyTextureToPart(partName: string, texturePath: string) {
  const event = new CustomEvent('apply-texture', {
    detail: { partName, texturePath }
  })
  window.dispatchEvent(event)
}

function applyRimTexture(texturePath: string) {
  DEFAULT_RIM_PARTS.forEach((name) => {
    window.dispatchEvent(new CustomEvent('apply-texture', {
      detail: { partName: name, texturePath }
    }))
  })
}

  return (
    <>
      <div className="absolute top-[10px] left-5 z-10 bg-[#1D4075] p-4 rounded-md shadow text-sm space-y-2 text-white">
        <div className="items-center">
          <h1>Headlight:</h1>
          <input type="color" value={bodyColor} onChange={(e) => setBodyColor(e.target.value)} />
        </div>
        <div className="items-center">
          <h1>Body:</h1>
          <input type="color" value={detailsColor} onChange={(e) => setDetailsColor(e.target.value)} />
        </div>
        <div className="items-center">
          <h1>Glass:</h1>
          <input type="color" value={glassColor} onChange={(e) => setGlassColor(e.target.value)} />
        </div>
        <div className="space-y-2">
        <div className="items-center">
          <h1 className='mb-1'>Rims:</h1>
          <div className='flex gap-2'>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              checked={rimMode === 'color'}
              onChange={() => {
                setRimMode('color')
                DEFAULT_RIM_PARTS.forEach((name) => {
                  setPartMode((prev) => ({ ...prev, [name]: 'color' }))
                })
              }}
            />
            Color
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              checked={rimMode === 'texture'}
              onChange={() => {
                setRimMode('texture')
                DEFAULT_RIM_PARTS.forEach((name) => {
                  setPartMode((prev) => ({ ...prev, [name]: 'texture' }))
                })
                applyRimTexture('/glbviewer/texture/carbon.jpg') // default texture
                // applyRimTexture('/texture/carbon.jpg') // default texture
              }}
            />
            Texture
          </label>
          </div>
        </div>

        {rimMode === 'color' ? (
          <input
            type="color"
            value={detailsRim}
            onChange={(e) => setDetailsRim(e.target.value)}
          />
        ) : (
          <div className="flex gap-3">
            {[
              // { name: 'Carbon', file: '/texture/carbon.jpg' },
              // { name: 'Metal', file: '/texture/metal.png' },
              // { name: 'Camo', file: '/texture/camo.png' },
              { name: 'Carbon', file: '/glbviewer/texture/carbon.jpg' },
              { name: 'Metal', file: '/glbviewer/texture/metal.png' },
              { name: 'Camo', file: '/glbviewer/texture/camo.png' },
            ].map(({ name, file }) => (
              <div key={file} className="text-center">
                <img
                  src={file}
                  alt={name}
                  className="w-14 h-14 object-cover border border-white cursor-pointer hover:scale-105 transition"
                  onClick={() => applyRimTexture(file)}
                />
                <p className="text-xs">{name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

        <button
          onClick={handleReset}
          className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
        >
          Reset
        </button>
      </div>

      <div className="description absolute top-5 right-5 z-10 bg-[#1D4075] text-white text-xs p-3 rounded-md max-w-[400px] font-mono">
        {selectedPartName && meshDescriptions[selectedPartName]
        ? meshDescriptions[selectedPartName](
        partColors[selectedPartName] || '#ffffff',
        (newColor) => setPartColors((prev) => ({ ...prev, [selectedPartName]: newColor })),
        partMode[selectedPartName] || 'color',
        (newMode) => setPartMode((prev) => ({ ...prev, [selectedPartName]: newMode })),
        (partName, texturePath) => {
          window.dispatchEvent(new CustomEvent('apply-texture', {
            detail: { partName, texturePath }
          }))
        }
      )

        : <h1 className='text-lg'>Click car part for details.</h1>}
      </div>

      <div className='logo absolute w-[300px] top-[10px] left-1/2 -translate-x-1/2'>
        <img src={'/glbviewer/ford-logo.png'} />
        {/* <img src={'/ford-logo.png'} /> */}
      </div>

      <GLBViewer
      bodyColor={bodyColor}
      detailsColor={detailsColor}
      glassColor={glassColor}
      partColors={partColors}
      detailsRim={detailsRim}
      partMode={partMode}
      onSelectMaterial={handleSelect}
    />
    </>
  )
}
