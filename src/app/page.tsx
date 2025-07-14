// // src/app/page.tsx

// import FerrariScene from '@/components/FerrariScene'
// import LowpolyScene from '@/components/LowpolyScene'
// import FlamingoScene from '@/components/LowpolyScene'

// export default function Home() {
//   return <LowpolyScene/>
// }

'use client'

import { useState } from 'react'
import GLBViewer from '@/components/GLBViewer'

export default function Home() {
  const [bodyColor, setBodyColor] = useState('#000000')
  const [detailsColor, setDetailsColor] = useState('#3333FF')
  const [glassColor, setGlassColor] = useState('#ffffff')

  return (
    <>
      <div className='text-black bg-gray-400' style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, padding: 10, borderRadius: 8 }}>
        <label>
          Light:
          <input type="color" value={bodyColor} onChange={(e) => setBodyColor(e.target.value)} />
        </label>
        <br />
        <label>
          Body:
          <input type="color" value={detailsColor} onChange={(e) => setDetailsColor(e.target.value)} />
        </label>
        <br />
        <label>
          Glass:
          <input type="color" value={glassColor} onChange={(e) => setGlassColor(e.target.value)} />
        </label>
      </div>

      <GLBViewer bodyColor={bodyColor} detailsColor={detailsColor} glassColor={glassColor} />
    </>
  )
}
