<template>
  <div ref="loader" class="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] text-white overflow-hidden pointer-events-none">
    <canvas ref="canvas" class="absolute inset-0 w-full h-full"></canvas>

    <div ref="cursor" class="fixed w-6 h-6 border border-[#D8E9A8] rounded-full pointer-events-none z-[10000] mix-blend-difference"></div>

    <div ref="textContainer" class="absolute bottom-20 text-center px-8 w-full max-w-2xl z-30">
      <div class="overflow-hidden mb-2">
        <h2 ref="mainText" class="text-3xl md:text-4xl font-light tracking-widest uppercase" style="color: #D8E9A8;">
          Nurturing Ideas
        </h2>
      </div>
      <p ref="subText" class="text-sm md:text-base text-white/40 tracking-[0.2em] lowercase">
        Move your cursor to accelerate growth
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { gsap } from 'gsap'
// Optional: If you want Bloom, you'd usually import EffectComposer, RenderPass, and UnrealBloomPass. 
// For this standalone version, I'll stick to a high-quality standard render with emissive materials.

const emit = defineEmits(['finished'])

const loader = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const cursor = ref<HTMLElement | null>(null)
const mainText = ref<HTMLElement | null>(null)
const subText = ref<HTMLElement | null>(null)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let treeGroup: THREE.Group
let branches: THREE.Mesh[] = []
let animationFrameId: number
const mouse = new THREE.Vector2() // For rotation
let growthProgress = 0
let exitTriggered = false
let composer: any = null

// Recursive Function with improved tapering
function createBranch(start: THREE.Vector3, direction: THREE.Vector3, length: number, depth: number, maxDepth: number, thickness: number) {
  if (depth > maxDepth) return

  const end = start.clone().add(direction.clone().multiplyScalar(length))

  // Geometry Tapering
  const radius = thickness * 0.18 // Adjusts branch thickness
  const radialSegments = Math.max(6, Math.floor(6 - depth / 2))
  const geometry = new THREE.CylinderGeometry(radius * 0.7, radius, length, radialSegments)
  const material = new THREE.MeshStandardMaterial({
    color: '#D8E9A8',
    emissive: '#D8E9A8',
    emissiveIntensity: depth > Math.floor(maxDepth * 0.7) ? 1.4 : 0.45,
    transparent: true,
    opacity: 0,
    roughness: 0.35,
  })

  // Add a subtle fresnel/rim effect by injecting into the material shader
  material.onBeforeCompile = (shader) => {
    shader.uniforms.rimColor = { value: new THREE.Color('#FFF8C8') }
    shader.uniforms.rimPower = { value: 1.8 + (maxDepth - depth) * 0.02 }
    shader.fragmentShader = 'uniform vec3 rimColor; uniform float rimPower;\n' + shader.fragmentShader
      .replace('#include <dithering_fragment>', '#include <dithering_fragment>\n    vec3 viewDir = normalize(vViewPosition);\n    float rim = 1.0 - max(dot(normalize(normal), viewDir), 0.0);\n    rim = pow(rim, rimPower);\n    gl_FragColor.rgb += rim * rimColor * 0.06;')
  }

  const branch = new THREE.Mesh(geometry, material)
  branch.position.copy(start).lerp(end, 0.5)
  
  const yAxis = new THREE.Vector3(0, 1, 0)
  const quaternion = new THREE.Quaternion().setFromUnitVectors(yAxis, direction.clone().normalize())
  branch.quaternion.copy(quaternion)

  branch.userData = { depth, order: branches.length }
  branches.push(branch)
  treeGroup.add(branch)

  // Add small fruit at tips for visual interest (only for deeper branches / tips)
  if (depth >= Math.floor(maxDepth * 0.75)) {
    const fruitGeo = new THREE.SphereGeometry(Math.max(0.06, radius * 0.5), 8, 8)
    const fruitMat = new THREE.MeshStandardMaterial({ color: '#FF6B6B', emissive: '#FF8777', emissiveIntensity: 1.6, roughness: 0.2 })
    const fruit = new THREE.Mesh(fruitGeo, fruitMat)
    fruit.position.copy(end.clone().add(direction.clone().normalize().multiplyScalar(0.18)))
    // Slight random offset so fruits don't perfectly overlap
    fruit.position.x += (Math.random() - 0.5) * 0.12
    fruit.position.z += (Math.random() - 0.5) * 0.12
    treeGroup.add(fruit)
  }

  if (depth < maxDepth) {
    const branchesAtNode = 2
    const up = new THREE.Vector3(0, 1, 0)
    const perp = new THREE.Vector3().crossVectors(direction, up).normalize()
    for (let i = 0; i < branchesAtNode; i++) {
      const side = i === 0 ? 1 : -1
      const yaw = (Math.PI / 4) * (0.6 + Math.random() * 0.3) * side
      const newDir = direction.clone().applyAxisAngle(perp, yaw)
      // slight random tilt to avoid mechanical look
      const randAxis = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.2, Math.random() - 0.5).normalize()
      newDir.applyAxisAngle(randAxis, (Math.random() - 0.5) * 0.35)

      // small outward offset for the child start point to reduce intersections
      const offset = perp.clone().multiplyScalar(side * (0.18 + Math.random() * 0.22) * (thickness * 0.06))
      const newStart = end.clone().add(offset)

      createBranch(newStart, newDir, length * (0.68 + Math.random() * 0.08), depth + 1, maxDepth, thickness * (0.66 + Math.random() * 0.08))
    }
  }
}

onMounted(() => {
  if (!canvas.value) return

  // Scene Setup
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(76, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 27 // Pull camera back to frame the larger trees

  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  treeGroup = new THREE.Group()
  treeGroup.position.y = -10 // Move tree down to center it
  treeGroup.scale.set(1.0, 1.0, 1.0) // Make the whole structure slightly larger
  scene.add(treeGroup)

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.2)
  const point = new THREE.PointLight('#D8E9A8', 3, 60)
  point.position.set(5, 5, 5)
  scene.add(ambient, point)

  // Create three main trunks with increased base thickness
  createBranch(new THREE.Vector3(-4, 0, -1.2), new THREE.Vector3(0.15, 1, 0.05), 6.2, 0, 9, 6)
  createBranch(new THREE.Vector3(0, 0, -0.6), new THREE.Vector3(0, 1, 0), 6.6, 0, 9, 7)
  createBranch(new THREE.Vector3(4, 0, -1.2), new THREE.Vector3(-0.15, 1, 0.05), 6.2, 0, 9, 6)

  const animate = () => {
    const time = performance.now() * 0.001
    
    // Smooth growth logic
    const visibleCount = Math.floor(branches.length * growthProgress)
    branches.forEach((branch, i) => {
      const mat = branch.material as THREE.MeshStandardMaterial
      if (i < visibleCount) {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, 1, 0.05)
      }
    })

    // Swaying "Wind" effect
    treeGroup.rotation.y += 0.009// Increased spin speed
    treeGroup.rotation.z = Math.sin(time * 0.5) * 0.02
    
    // Auto-growth
    if (growthProgress < 1 && !exitTriggered) {
      growthProgress += 0.009 // Increased growth speed
    } else if (!exitTriggered) {
      triggerExit()
    }

    renderer?.render(scene, camera)
    animationFrameId = requestAnimationFrame(animate)
  }

  // Cursor following logic
  const handleMouseMove = (e: MouseEvent) => {
    if (cursor.value) {
      gsap.to(cursor.value, {
        x: e.clientX - 12,
        y: e.clientY - 12,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
    
    // Interaction boosts growth
    growthProgress = Math.min(1, growthProgress + 0.005)
    
    // Rotate tree based on mouse
    const x = (e.clientX / window.innerWidth) - 0.5
    const y = (e.clientY / window.innerHeight) - 0.5
    gsap.to(treeGroup.rotation, { x: y * 0.5, y: x * 0.5, duration: 2 })
  }

  window.addEventListener('mousemove', handleMouseMove)
  animate()

  // Intro UI
  gsap.from([mainText.value, subText.value], { 
    y: 30, 
    opacity: 0, 
    duration: 1.5, 
    ease: 'power3.out', 
    stagger: 0.2,
    delay: 0.5 
  })
})

const triggerExit = () => {
  if (exitTriggered) return
  exitTriggered = true

  // Emit immediately to allow parent component to start its transition
  emit('finished')

  const tl = gsap.timeline()
  // Animate out the UI elements
  tl.to([mainText.value, subText.value, cursor.value], { opacity: 0, duration: 0.5, ease: 'power2.in' })
    // Animate the entire loader screen sliding away
    .to(loader.value, { clipPath: 'inset(0 0 100% 0)', duration: 1.2, ease: 'expo.inOut' }, '<')
}

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  renderer?.dispose()
})
</script>

<style scoped>
/* Ensure the canvas is smooth */
canvas {
  filter: blur(0.4px); /* Subtle smoothing */
}

/* Hide default cursor only when loader is active */
.fixed {
  cursor: none;
}
</style>