import React, { JSX } from 'react'

export const meshDescriptions: Record<string, (color: string, setColor: (v: string) => void) => JSX.Element> = {
  carpaint_door_FL_doorLayer: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Detail: Pintu depan kiri</h1>
      <p>Pilih warna untuk bagian ini:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_door_FR_doorLayer: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Detail: Pintu depan kiri</h1>
      <p>Pilih warna untuk bagian ini:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_door_RL_doorLayer: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Detail: Pintu depan kiri</h1>
      <p>Pilih warna untuk bagian ini:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  glassDark_windshield: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Glass: Kaca Gelap Windshield</h1>
      <p>Atur warna kaca:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  glass_headlight: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Lampu Depan</h1>
      <p>Kaca pelindung lampu depan</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
}
