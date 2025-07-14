'use client'

import { JSX, useEffect, useRef, useState } from 'react'
import GLBViewer from '@/components/GLBViewer'
import { meshDescriptions } from '@/components/meshDescription'

export default function Home() {
  const [bodyColor, setBodyColor] = useState('#000000')
  const [detailsColor, setDetailsColor] = useState('#3333FF')
  const [glassColor, setGlassColor] = useState('#ffffff')
  const [partColors, setPartColors] = useState<Record<string, string>>({})

  const [selectedPartName, setSelectedPartName] = useState<string | null>(null)

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
  ]

  setPartColors((prev) => {
    const updated = { ...prev }
    detailParts.forEach((name) => {
      updated[name] = detailsColor
    })
    return updated
  })
}, [detailsColor])

  function handleSelect(name: string) {
  if (meshDescriptions[name]) {
    setSelectedPartName(name)
  } else {
    setSelectedPartName(null)
  }
}


  return (
    <>
      <div className="absolute top-5 left-5 z-10 bg-gray-200 p-4 rounded-md shadow text-sm space-y-2 text-black">
        <label className="block">
          Light:
          <input type="color" value={bodyColor} onChange={(e) => setBodyColor(e.target.value)} />
        </label>
        <label className="block">
          Body:
          <input type="color" value={detailsColor} onChange={(e) => setDetailsColor(e.target.value)} />
        </label>
        <label className="block">
          Glass:
          <input type="color" value={glassColor} onChange={(e) => setGlassColor(e.target.value)} />
        </label>
      </div>

      <div className="absolute top-40 left-5 z-10 bg-black/70 text-white text-xs p-3 rounded-md max-w-xs font-mono">
  {selectedPartName && meshDescriptions[selectedPartName]
    ? meshDescriptions[selectedPartName](
        partColors[selectedPartName] || '#ffffff',
        (newColor) =>
          setPartColors((prev) => ({ ...prev, [selectedPartName]: newColor }))
      )
    : <p>Klik bagian mobil untuk melihat deskripsi.</p>}
</div>


      <GLBViewer
      bodyColor={bodyColor}
      detailsColor={detailsColor}
      glassColor={glassColor}
      partColors={partColors}
      onSelectMaterial={handleSelect}
    />
    </>
  )
}
