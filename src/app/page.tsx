'use client'

import { JSX, useState } from 'react'
import GLBViewer from '@/components/GLBViewer'

export default function Home() {
  const [bodyColor, setBodyColor] = useState('#000000')
  const [detailsColor, setDetailsColor] = useState('#3333FF')
  const [glassColor, setGlassColor] = useState('#ffffff')

  const [description, setDescription] = useState<JSX.Element>(
  <p>Klik bagian mobil untuk melihat deskripsi.</p>
)

  const meshDescriptions: Record<string, JSX.Element> = {
  carpaint_door_FL_doorLayer: (
    <div>
      <h1 className="text-lg font-bold">Detail: Pintu depan kiri</h1>
      <h2 className="text-sm text-gray-600">Pilih warna untuk menyesuaikan bagian ini</h2>
    </div>
  ),
  carpaint_hood: (
    <div>
      <h1 className="text-lg font-bold">Detail: Kap Mesin</h1>
      <p className="text-sm">Bagian atas mesin mobil, bisa dikustomisasi warnanya.</p>
    </div>
  ),
  // ...tambahkan lainnya sesuai kebutuhan
}


  return (
    <>
      <div className="absolute top-5 left-5 z-10 bg-gray-200 p-4 rounded-md shadow text-sm space-y-2 text-black">
        <label className="block">
          Light:
          <input type="color" value={bodyColor} onChange={(e) => setBodyColor(e.target.value)} />
        </label>
        <label className="block">
          Details:
          <input type="color" value={detailsColor} onChange={(e) => setDetailsColor(e.target.value)} />
        </label>
        <label className="block">
          Glass:
          <input type="color" value={glassColor} onChange={(e) => setGlassColor(e.target.value)} />
        </label>
      </div>

      <div className="absolute top-40 left-5 z-10 bg-black/70 text-white text-xs p-3 rounded-md max-w-xs font-mono">
        {description}
      </div>

      <GLBViewer
      bodyColor={bodyColor}
      detailsColor={detailsColor}
      glassColor={glassColor}
      onSelectMaterial={setDescription}
      meshDescriptions={meshDescriptions}
    />
    </>
  )
}
