import React, { JSX } from 'react'

export const meshDescriptions: Record<string, (color: string, setColor: (v: string) => void) => JSX.Element> = {
  carpaint_door_FL_doorLayer: (color, onChange) => (
    <div>
      <h1 className="text-xl font-bold">Front Left Door</h1>
    <div className='bg-white text-[#1D4075] p-3 rounded-lg my-2'>
      <h1 className='text-lg font-semibold'>Specification</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Outer Panel:</span> Made from steel, aluminum, or composite materials for durability and impact resistance.</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Inner Panel:</span>  Reinforced structure that holds components like the speaker, wiring, and impact beams.</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Side Impact Beam:</span>  Reinforcement bar inside the door to absorb energy during side collisions.</h1>
      </div>
      <p className='text-lg'>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_door_FR_doorLayer: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Front Right Door</h1>
      <div className='bg-white text-[#1D4075] p-3 rounded-lg my-2'>
      <h1 className='text-lg font-semibold'>Specification</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Outer Panel:</span> Made from steel, aluminum, or composite materials for durability and impact resistance.</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Inner Panel:</span>  Reinforced structure that holds components like the speaker, wiring, and impact beams.</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Side Impact Beam:</span>  Reinforcement bar inside the door to absorb energy during side collisions.</h1>
      </div>
      <p className='text-lg'>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_door_RL_doorLayer: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Rear Left Door</h1>
      <p>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_door_RR_doorLayer: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Rear Right Door</h1>
      <p>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_fenders_r: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Rear Fender</h1>
      <p>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_trunk: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Trunk</h1>
      <p>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_windshield: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Windshield Bar</h1>
      <p>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_fenders_f: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Front Fender</h1>
      <p>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_hood: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Hood</h1>
      <p>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  glassDark_windshield: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Glass: Windshield</h1>
      <p>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  rimDark_000_wheelsLayer: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Front Left Rim</h1>
      <p>Choose color:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  rimDark_001_wheelsLayer: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Rear Left Rim</h1>
      <p>Choose color:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  rimDark_002_wheelsLayer: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Front Right Rim</h1>
      <p>Choose color:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  rimDark_003_wheelsLayer: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Rear Right Rim</h1>
      <p>Choose color:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  glass_headlight: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Headlight</h1>
      <p>Choose color:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
}
