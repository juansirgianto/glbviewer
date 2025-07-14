'use client'

import { JSX, useEffect, useRef, useState } from 'react'
import GLBViewer from '@/components/GLBViewer'
import { meshDescriptions } from '@/components/meshDescription'

export default function Home() {
  const [bodyColor, setBodyColor] = useState('#ffffff')
  const [detailsColor, setDetailsColor] = useState('#3333FF')
  const [glassColor, setGlassColor] = useState('#ffffff')
  const [detailsRim, setDetailsRim] = useState('#888888') // warna default rim
  const [partColors, setPartColors] = useState<Record<string, string>>({})
  const [selectedPartName, setSelectedPartName] = useState<string | null>(null)

  const DEFAULT_BODY_COLOR = '#ffffff'
const DEFAULT_DETAILS_COLOR = '#3333FF'
const DEFAULT_GLASS_COLOR = '#ffffff'

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
]

const DEFAULT_RIM_PARTS = [
  'rimDark_000_wheelsLayer',
  'rimDark_001_wheelsLayer',
  'rimDark_002_wheelsLayer',
  'rimDark_003_wheelsLayer',
]

const DEFAULT_GLASS_PARTS = [
  'glass_headlight',
]

const ALL_CUSTOMIZABLE_PARTS = [
  ...DEFAULT_DETAIL_PARTS,
  ...DEFAULT_RIM_PARTS,
  ...DEFAULT_GLASS_PARTS,
]

function handleReset() {
  setBodyColor(DEFAULT_BODY_COLOR)
  setDetailsColor(DEFAULT_DETAILS_COLOR)
  setDetailsRim('#888888') // reset rim juga
  setGlassColor(DEFAULT_GLASS_COLOR)

  const resetPartColors: Record<string, string> = {}
  ALL_CUSTOMIZABLE_PARTS.forEach((name) => {
    if (DEFAULT_RIM_PARTS.includes(name)) {
      resetPartColors[name] = '#888888'
    } else if (DEFAULT_GLASS_PARTS.includes(name)) {
      resetPartColors[name] = DEFAULT_GLASS_COLOR
    } else {
      resetPartColors[name] = DEFAULT_DETAILS_COLOR
    }
  })

  setPartColors(resetPartColors)
  setSelectedPartName(null)
}

  const prevDetailsColor = useRef(detailsColor)

useEffect(() => {
  const detailParts = [
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

  setPartColors((prev) => {
    const updated = { ...prev }
    detailParts.forEach((name) => {
      updated[name] = detailsColor
    })
    return updated
  })
}, [detailsColor])

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

  return (
    <>
      <div className="absolute top-5 left-5 z-10 bg-[#1D4075] p-4 rounded-md shadow text-sm space-y-2 text-white">
        <div className="flex items-center gap-2">
          Light:
          <input type="color" value={bodyColor} onChange={(e) => setBodyColor(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          Body:
          <input type="color" value={detailsColor} onChange={(e) => setDetailsColor(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          Rims:
          <input type="color" value={detailsRim} onChange={(e) => setDetailsRim(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          Glass:
          <input type="color" value={glassColor} onChange={(e) => setGlassColor(e.target.value)} />
        </div>
        <button
          onClick={handleReset}
          className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
        >
          Reset
        </button>
      </div>

      <div className="absolute top-5 right-5 z-10 bg-[#1D4075] text-white text-xs p-3 rounded-md max-w-[400px] font-mono">
        {selectedPartName && meshDescriptions[selectedPartName]
          ? meshDescriptions[selectedPartName](
              partColors[selectedPartName] || '#ffffff',
              (newColor) =>
                setPartColors((prev) => ({ ...prev, [selectedPartName]: newColor }))
            )
          : <p>Click car part for details.</p>}
      </div>

      <div className='absolute w-[300px] top-1 left-1/2 -translate-x-1/2'>
        <img src="/ford-logo.png" alt="" />
      </div>

      <GLBViewer
      bodyColor={bodyColor}
      detailsColor={detailsColor}
      glassColor={glassColor}
      partColors={partColors}
      detailsRim={detailsRim}
      onSelectMaterial={handleSelect}
    />
    </>
  )
}
