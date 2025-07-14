import React, { JSX } from 'react'

export const meshDescriptions: Record<string, (color: string, setColor: (v: string) => void) => JSX.Element> = {
  carpaint_door_FL_doorLayer: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Detail: Front Left Door</h1>
      <p>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_door_FR_doorLayer: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Detail: Front Right Door</h1>
      <p>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_door_RL_doorLayer: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Detail: Rear Left Door</h1>
      <p>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_door_RR_doorLayer: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Detail: Rear Right Door</h1>
      <p>Choose color for this part:</p>
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
  rimDark_000_wheelsLayer: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Detail: Front Left Rim</h1>
      <p>Choose color:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  rimDark_001_wheelsLayer: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Detail: Rear Left Rim</h1>
      <p>Choose color:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  rimDark_002_wheelsLayer: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Glass: Kaca Gelap Windshield</h1>
      <p>Atur warna kaca:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  rimDark_003_wheelsLayer: (color, onChange) => (
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
