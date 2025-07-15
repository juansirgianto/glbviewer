// utils/createTriplanarMaterial.ts
import * as THREE from 'three'

export function createTriplanarMaterial(texture: THREE.Texture, scale: number = 4.0) {
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
    `,
    transparent: false
  })
}
