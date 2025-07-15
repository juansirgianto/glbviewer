// meshDescription.tsx

import React, { JSX } from 'react'

export const meshDescriptions: Record<string, (color: string, setColor: (v: string) => void, mode: 'color' | 'texture', setMode: (v: 'color' | 'texture') => void, applyTexture?: (part: string, texPath: string) => void)
 => JSX.Element> = {
  carpaint_door_FL_doorLayer: (color, onChange) => (
    <div>
      <h1 className="text-xl font-bold">Front Left Door</h1>
    <div className='border-white border-2 text-white p-3 rounded-lg my-2'>
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
      <div className='border-white border-2 text-white p-3 rounded-lg my-2'>
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
      <div className='border-white border-2 text-white p-3 rounded-lg my-2'>
      <h1 className='text-lg font-semibold'>Specification</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Outer Panel:</span> Made from steel, aluminum, or composite materials for durability and impact resistance.</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Inner Panel:</span>  Reinforced structure that holds components like the speaker, wiring, and impact beams.</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Side Impact Beam:</span>  Reinforcement bar inside the door to absorb energy during side collisions.</h1>
      </div>
      <p className='text-lg'>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_door_RR_doorLayer: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Rear Right Door</h1>
      <div className='border-white border-2 text-white p-3 rounded-lg my-2'>
      <h1 className='text-lg font-semibold'>Specification</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Outer Panel:</span> Made from steel, aluminum, or composite materials for durability and impact resistance.</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Inner Panel:</span>  Reinforced structure that holds components like the speaker, wiring, and impact beams.</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Side Impact Beam:</span>  Reinforcement bar inside the door to absorb energy during side collisions.</h1>
      </div>
      <p className='text-lg'>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_fenders_r: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Rear Fender</h1>
      <p className='text-lg'>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_trunk: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Trunk</h1>
      <p className='text-lg'>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_windshield: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Windshield Bar</h1>
      <p className='text-lg'>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_fenders_f: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Front Fender</h1>
      <p className='text-lg'>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  carpaint_hood: (color, onChange, mode, setMode, applyTexture) => (
  <div>
    <h1 className="text-lg font-bold">Hood</h1>

    <div className='flex gap-4 mt-2'>
      <label className='text-lg items-center flex gap-2'>
        <input
          type="radio"
          checked={mode === 'color'}
          onChange={() => setMode('color')}
        />
        Warna
      </label>

      <label className='text-lg items-center flex gap-2'>
        <input
          type="radio"
          checked={mode === 'texture'}
          onChange={() => setMode('texture')}
        />
        Tekstur
      </label>
    </div>

    {mode === 'color' ? (
      <>
        <p className="text-lg mt-2">Pilih warna:</p>
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
        />
      </>
    ) : (
      <>
        <p className="text-lg mt-2 mb-1">Pilih tekstur:</p>
        <div className="flex gap-3 flex-wrap">
          {[
            { name: 'Carbon', file: '/glbviewer/texture/carbon.jpg' },
            { name: 'Metal', file: '/glbviewer/texture/metal.png' },
            { name: 'Camo', file: '/glbviewer/texture/camo.png' },
            // { name: 'Carbon', file: '/texture/carbon.jpg' },
            // { name: 'Metal', file: '/texture/metal.png' },
            // { name: 'Camo', file: '/texture/camo.png' },
          ].map(({ name, file }) => (
            <div key={file} className="text-center">
              <img
                src={file}
                alt={name}
                className="w-20 h-20 object-cover border border-white cursor-pointer hover:scale-105 transition"
                onClick={() => applyTexture?.('carpaint_hood', file)}
              />
              <p className="text-sm mt-1">{name}</p>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
),
  glassDark_windshield: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Glass: Windshield</h1>
      <p className='text-lg'>Choose color for this part:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
  rimDark_000_wheelsLayer: (color, onChange, mode, setMode, applyTexture) => (
  <div>
    <h1 className="text-lg font-bold">Hood</h1>
    <div className='border-white border-2 text-white p-3 rounded-lg my-2'>
      <h1 className='text-lg font-semibold'>Specification</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Diameter:</span> 16".</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Width:</span> 6".</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Material:</span>  Carbon Fiber.</h1>
      </div>

    <div className='flex gap-4 mt-2'>
      <label className='text-lg items-center flex gap-2'>
        <input
          type="radio"
          checked={mode === 'color'}
          onChange={() => setMode('color')}
        />
        Warna
      </label>

      <label className='text-lg items-center flex gap-2'>
        <input
          type="radio"
          checked={mode === 'texture'}
          onChange={() => setMode('texture')}
        />
        Tekstur
      </label>
    </div>

    {mode === 'color' ? (
      <>
        <p className="text-lg mt-2">Pilih warna:</p>
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
        />
      </>
    ) : (
      <>
        <p className="text-lg mt-2 mb-1">Pilih tekstur:</p>
        <div className="flex gap-3 flex-wrap">
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
                className="w-20 h-20 object-cover border border-white cursor-pointer hover:scale-105 transition"
                onClick={() => applyTexture?.('rimDark_000_wheelsLayer', file)}
              />
              <p className="text-sm mt-1">{name}</p>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
),
  rimDark_001_wheelsLayer: (color, onChange, mode, setMode, applyTexture) => (
  <div>
    <h1 className="text-lg font-bold">Rear Left Rim</h1>
    <div className='border-white border-2 text-white p-3 rounded-lg my-2'>
      <h1 className='text-lg font-semibold'>Specification</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Diameter:</span> 16".</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Width:</span> 6".</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Material:</span>  Carbon Fiber.</h1>
      </div>

    <div className='flex gap-4 mt-2'>
      <label className='text-lg items-center flex gap-2'>
        <input
          type="radio"
          checked={mode === 'color'}
          onChange={() => setMode('color')}
        />
        Warna
      </label>

      <label className='text-lg items-center flex gap-2'>
        <input
          type="radio"
          checked={mode === 'texture'}
          onChange={() => setMode('texture')}
        />
        Tekstur
      </label>
    </div>

    {mode === 'color' ? (
      <>
        <p className="text-lg mt-2">Pilih warna:</p>
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
        />
      </>
    ) : (
      <>
        <p className="text-lg mt-2 mb-1">Pilih tekstur:</p>
        <div className="flex gap-3 flex-wrap">
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
                className="w-20 h-20 object-cover border border-white cursor-pointer hover:scale-105 transition"
                onClick={() => applyTexture?.('rimDark_001_wheelsLayer', file)}
              />
              <p className="text-sm mt-1">{name}</p>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
),
  rimDark_002_wheelsLayer: (color, onChange, mode, setMode, applyTexture) => (
  <div>
    <h1 className="text-lg font-bold">Front Right Rim</h1>
    <div className='border-white border-2 text-white p-3 rounded-lg my-2'>
      <h1 className='text-lg font-semibold'>Specification</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Diameter:</span> 16".</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Width:</span> 6".</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Material:</span>  Carbon Fiber.</h1>
      </div>

    <div className='flex gap-4 mt-2'>
      <label className='text-lg items-center flex gap-2'>
        <input
          type="radio"
          checked={mode === 'color'}
          onChange={() => setMode('color')}
        />
        Warna
      </label>

      <label className='text-lg items-center flex gap-2'>
        <input
          type="radio"
          checked={mode === 'texture'}
          onChange={() => setMode('texture')}
        />
        Tekstur
      </label>
    </div>

    {mode === 'color' ? (
      <>
        <p className="text-lg mt-2">Pilih warna:</p>
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
        />
      </>
    ) : (
      <>
        <p className="text-lg mt-2 mb-1">Pilih tekstur:</p>
        <div className="flex gap-3 flex-wrap">
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
                className="w-20 h-20 object-cover border border-white cursor-pointer hover:scale-105 transition"
                onClick={() => applyTexture?.('rimDark_002_wheelsLayer', file)}
              />
              <p className="text-sm mt-1">{name}</p>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
),
  rimDark_003_wheelsLayer: (color, onChange, mode, setMode, applyTexture) => (
  <div>
    <h1 className="text-lg font-bold">Rear Right Rim</h1>
    <div className='border-white border-2 text-white p-3 rounded-lg my-2'>
      <h1 className='text-lg font-semibold'>Specification</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Diameter:</span> 16".</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Width:</span> 6".</h1>
      <h1 className='text-lg'><span className='font-semibold'>- Material:</span>  Carbon Fiber.</h1>
      </div>

    <div className='flex gap-4 mt-2'>
      <label className='text-lg items-center flex gap-2'>
        <input
          type="radio"
          checked={mode === 'color'}
          onChange={() => setMode('color')}
        />
        Warna
      </label>

      <label className='text-lg items-center flex gap-2'>
        <input
          type="radio"
          checked={mode === 'texture'}
          onChange={() => setMode('texture')}
        />
        Tekstur
      </label>
    </div>

    {mode === 'color' ? (
      <>
        <p className="text-lg mt-2">Pilih warna:</p>
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
        />
      </>
    ) : (
      <>
        <p className="text-lg mt-2 mb-1">Pilih tekstur:</p>
        <div className="flex gap-3 flex-wrap">
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
                className="w-20 h-20 object-cover border border-white cursor-pointer hover:scale-105 transition"
                onClick={() => applyTexture?.('rimDark_003_wheelsLayer', file)}
              />
              <p className="text-sm mt-1">{name}</p>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
),
  glass_headlight: (color, onChange) => (
    <div>
      <h1 className="text-lg font-bold">Headlight</h1>
      <p className='text-lg'>Choose color:</p>
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
}
