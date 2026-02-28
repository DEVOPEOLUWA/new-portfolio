import * as THREE from 'three'

export interface Hero3DOptions {
  container: HTMLElement
  accentColor?: string
}

// ── Grid terrain vertex shader ──
const gridVertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uMouse3D;
  uniform float uHover;
  uniform float uReveal;

  varying float vHeight;
  varying float vFog;
  varying vec2 vUv;
  varying float vMouseGlow;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p = p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Terrain deformation via FBM noise — gentle rolling waves
    float n = fbm(pos.xz * 0.35 + uTime * 0.06);
    float terrain = n * 0.9 * uReveal;

    // Mouse-reactive — smooth soft hill that follows cursor
    float mouseDist = distance(pos.xz, uMouse3D.xz);
    float mouseInfluence = smoothstep(4.5, 0.0, mouseDist) * uHover * 1.2;
    // Soft concentric ripples emanating from cursor
    float mouseRipple = sin(mouseDist * 2.0 - uTime * 2.0) * 0.08 * smoothstep(6.0, 1.5, mouseDist) * uHover;

    pos.y += terrain + mouseInfluence + mouseRipple;

    vHeight = pos.y;
    vMouseGlow = smoothstep(5.0, 0.0, mouseDist) * uHover;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    vFog = smoothstep(2.0, 35.0, -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
  }
`

const gridFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccentColor;
  uniform float uTime;

  varying float vHeight;
  varying float vFog;
  varying vec2 vUv;
  varying float vMouseGlow;

  void main() {
    // Height-based color blend
    float heightMix = smoothstep(-0.1, 1.5, vHeight);
    vec3 col = mix(uColor, uAccentColor, heightMix * 0.55);

    // Subtle glow around cursor position
    col += uAccentColor * vMouseGlow * 0.4;

    // Subtle pulse at peaks
    col += uAccentColor * smoothstep(0.6, 1.3, vHeight) * 0.15;

    // Edge fade
    float edgeFade = 1.0 - vFog;

    gl_FragColor = vec4(col, edgeFade * 0.5);
  }
`

// ── Axis lines shader ──
const axisVertexShader = /* glsl */ `
  varying float vT;
  attribute float aT;

  void main() {
    vT = aT;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const axisFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vT;

  void main() {
    float alpha = smoothstep(1.0, 0.0, vT) * 0.35;
    gl_FragColor = vec4(uColor, alpha);
  }
`

export function useHero3D() {
  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let renderer: THREE.WebGLRenderer
  let gridMesh: THREE.Mesh
  let rafId: number | null = null
  let container: HTMLElement | null = null
  let isDestroyed = false
  let time = 0

  // Groups
  let sceneGroup: THREE.Group

  // Uniforms
  let gridUniforms: Record<string, THREE.IUniform>

  // Mouse — smoothed
  let mouseWorld = new THREE.Vector3(100, 0, 100)
  let mouseTarget = new THREE.Vector3(100, 0, 100)
  let hoverStrength = 0
  let hoverTarget = 0

  // Rotation
  let targetRotY = 0
  let targetRotX = 0

  // Reveal
  let revealProgress = 0
  let revealTarget = 0

  const init = (opts: Hero3DOptions) => {
    container = opts.container
    isDestroyed = false
    const accentHex = opts.accentColor || '#6B5D52'

    scene = new THREE.Scene()

    const aspect = container.clientWidth / container.clientHeight
    camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 60)
    camera.position.set(0, 6, 10)
    camera.lookAt(0, 0, 0)

    renderer = new THREE.WebGLRenderer({
      antialias: false, // faster — wireframe doesn't need AA
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)) // cap at 1.5 for speed
    container.appendChild(renderer.domElement)

    const accentColor = new THREE.Color(accentHex)
    const baseColor = new THREE.Color(0x5C4E42)

    sceneGroup = new THREE.Group()
    sceneGroup.position.set(0, -1.8, 0)
    scene.add(sceneGroup)

    // ── Wireframe Grid Terrain — covers full hero ──
    const gridSize = 28
    const gridSegments = 50
    const gridGeo = new THREE.PlaneGeometry(gridSize, gridSize, gridSegments, gridSegments)
    gridGeo.rotateX(-Math.PI / 2)

    gridUniforms = {
      uTime: { value: 0 },
      uMouse3D: { value: new THREE.Vector3(100, 0, 100) },
      uHover: { value: 0 },
      uReveal: { value: 0 },
      uColor: { value: baseColor },
      uAccentColor: { value: accentColor },
    }

    const gridMat = new THREE.ShaderMaterial({
      vertexShader: gridVertexShader,
      fragmentShader: gridFragmentShader,
      uniforms: gridUniforms,
      transparent: true,
      wireframe: true,
      depthWrite: false,
    })

    gridMesh = new THREE.Mesh(gridGeo, gridMat)
    sceneGroup.add(gridMesh)

    // ── 3D Coordinate Axes ──
    const axisLength = 8
    const axisData = [
      { dir: [1, 0, 0] },
      { dir: [0, 1, 0] },
      { dir: [0, 0, 1] },
    ]

    axisData.forEach(({ dir }) => {
      const points = 30
      const positions = new Float32Array(points * 3)
      const ts = new Float32Array(points)

      for (let i = 0; i < points; i++) {
        const t = i / (points - 1)
        positions[i * 3] = dir[0] * t * axisLength
        positions[i * 3 + 1] = dir[1] * t * axisLength
        positions[i * 3 + 2] = dir[2] * t * axisLength
        ts[i] = t
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geo.setAttribute('aT', new THREE.BufferAttribute(ts, 1))

      const mat = new THREE.ShaderMaterial({
        vertexShader: axisVertexShader,
        fragmentShader: axisFragmentShader,
        uniforms: { uColor: { value: accentColor } },
        transparent: true,
        depthWrite: false,
      })

      const line = new THREE.Line(geo, mat)
      sceneGroup.add(line)

      // Tick marks
      for (let t = 1; t <= 7; t++) {
        const tickGeo = new THREE.BufferGeometry()
        const tickSize = 0.08
        const base = [dir[0] * t, dir[1] * t, dir[2] * t]
        const perp = dir[0] === 1 ? [0, tickSize, 0] : [tickSize, 0, 0]
        const tickPositions = new Float32Array([
          base[0] - perp[0], base[1] - perp[1], base[2] - perp[2],
          base[0] + perp[0], base[1] + perp[1], base[2] + perp[2],
        ])
        const tickTs = new Float32Array([t / axisLength, t / axisLength])
        tickGeo.setAttribute('position', new THREE.BufferAttribute(tickPositions, 3))
        tickGeo.setAttribute('aT', new THREE.BufferAttribute(tickTs, 1))
        const tickLine = new THREE.Line(tickGeo, mat)
        sceneGroup.add(tickLine)
      }
    })

    // No floating dots or connecting lines — clean terrain only

    animate()
  }

  const assembleIn = (delay = 0) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        revealTarget = 1
        setTimeout(resolve, 2000)
      }, delay)
    })
  }

  const animate = () => {
    if (isDestroyed) return
    time += 0.01

    // Smooth reveal
    revealProgress += (revealTarget - revealProgress) * 0.035

    // Smoother mouse interpolation (higher lerp = more responsive)
    mouseWorld.lerp(mouseTarget, 0.12)
    hoverStrength += (hoverTarget - hoverStrength) * 0.08

    // Update uniforms
    gridUniforms.uTime.value = time
    gridUniforms.uMouse3D.value.copy(mouseWorld)
    gridUniforms.uHover.value = hoverStrength
    gridUniforms.uReveal.value = revealProgress

    // Smooth scene rotation from mouse
    sceneGroup.rotation.y += (targetRotY - sceneGroup.rotation.y) * 0.03
    sceneGroup.rotation.x += (targetRotX - sceneGroup.rotation.x) * 0.03

    renderer.render(scene, camera)
    rafId = requestAnimationFrame(animate)
  }

  // Raycast mouse onto grid plane (y=0)
  const raycaster = new THREE.Raycaster()
  const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
  const mouseNDC = new THREE.Vector2()
  const intersectPt = new THREE.Vector3()

  const onMouseMove = (nx: number, ny: number) => {
    // nx, ny: -0.5 to 0.5
    targetRotY = nx * 0.1
    targetRotX = -ny * 0.05

    // Raycast to find world position on ground plane
    mouseNDC.set(nx * 2, -ny * 2)
    raycaster.setFromCamera(mouseNDC, camera)
    const hit = raycaster.ray.intersectPlane(groundPlane, intersectPt)
    if (hit) {
      const local = intersectPt.clone()
      sceneGroup.worldToLocal(local)
      mouseTarget.copy(local)
      hoverTarget = 1
    } else {
      hoverTarget = 0
    }
  }

  const onResize = () => {
    if (!container || !camera || !renderer) return
    const w = container.clientWidth
    const h = container.clientHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }

  const updateAccentColor = (hex: string) => {
    if (gridUniforms) gridUniforms.uAccentColor.value.set(hex)
  }

  const updateForDarkMode = (isDark: boolean) => {
    if (!gridUniforms) return
    if (isDark) {
      // Dark mode: light warm brown wireframe
      gridUniforms.uColor.value.set(0xA89888)
    } else {
      // Light mode: darker warm brown wireframe
      gridUniforms.uColor.value.set(0x5C4E42)
    }
  }

  const destroy = () => {
    isDestroyed = true
    if (rafId) cancelAnimationFrame(rafId)
    if (renderer && container) {
      container.removeChild(renderer.domElement)
      renderer.dispose()
    }
    if (sceneGroup) {
      sceneGroup.traverse((child) => {
        if ((child as THREE.Mesh).geometry) (child as THREE.Mesh).geometry.dispose()
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material
          if (Array.isArray(mat)) mat.forEach(m => m.dispose())
          else (mat as THREE.Material).dispose()
        }
      })
    }
  }

  return {
    init,
    assembleIn,
    onMouseMove,
    onResize,
    updateAccentColor,
    updateForDarkMode,
    destroy,
  }
}
