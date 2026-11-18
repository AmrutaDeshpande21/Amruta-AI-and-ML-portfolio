import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { prefersReducedMotion, scrollState } from '../lib/env'

// Geometry and motion follow the HTML prototype (AI_ML_Developer_Portfolio.html).
const LAYERS = [5, 8, 8, 6, 3]
const PULSES = 26
const LAYER_GAP = 3.6
const ROW_GAP = 1.5
const EDGE_KEEP = 0.7 // fraction of possible connections that are drawn

// Deterministic PRNG so the network looks the same between renders/StrictMode.
function mulberry(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function glowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')!
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grd.addColorStop(0, '#fff')
  grd.addColorStop(0.35, 'rgba(255,255,255,.8)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

function Network() {
  const group = useRef<THREE.Group>(null!)
  const pulsePts = useRef<THREE.Points>(null!)

  // Pointer state lives in a ref: written by the listener, read in useFrame, never via setState.
  const mouse = useRef({ x: 0, y: 0 })
  const reduced = useRef(prefersReducedMotion())
  const scroll = useRef(0)
  const idle = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMq = () => {
      reduced.current = mq.matches
      if (mq.matches) mouse.current.x = mouse.current.y = 0
    }
    const onMove = (e: PointerEvent) => {
      if (reduced.current) return
      mouse.current.x = e.clientX / window.innerWidth - 0.5
      mouse.current.y = e.clientY / window.innerHeight - 0.5
    }
    const onLeave = () => {
      mouse.current.x = mouse.current.y = 0
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      mq.removeEventListener('change', onMq)
    }
  }, [])

  const { nodePos, edges, linePos } = useMemo(() => {
    const rnd = mulberry(42)
    const nodes: THREE.Vector3[] = []
    const layerIdx: number[][] = []
    LAYERS.forEach((count, l) => {
      const ids: number[] = []
      for (let j = 0; j < count; j++) {
        ids.push(nodes.length)
        nodes.push(
          new THREE.Vector3(
            (l - 2) * LAYER_GAP,
            (j - (count - 1) / 2) * ROW_GAP + (rnd() - 0.5) * 0.5,
            (rnd() - 0.5) * 4,
          ),
        )
      }
      layerIdx.push(ids)
    })
    const e: [number, number][] = []
    for (let l = 0; l < layerIdx.length - 1; l++)
      for (const a of layerIdx[l]) for (const b of layerIdx[l + 1]) if (rnd() < EDGE_KEEP) e.push([a, b])
    const lp = new Float32Array(e.length * 6)
    e.forEach(([a, b], i) => {
      nodes[a].toArray(lp, i * 6)
      nodes[b].toArray(lp, i * 6 + 3)
    })
    const np = new Float32Array(nodes.length * 3)
    nodes.forEach((n, i) => n.toArray(np, i * 3))
    return { nodePos: np, edges: e, linePos: lp }
  }, [])

  const tex = useMemo(glowTexture, [])

  const pulses = useMemo(() => {
    const rnd = mulberry(7)
    return Array.from({ length: PULSES }, () => ({
      edge: Math.floor(rnd() * edges.length),
      t: rnd(),
      speed: (0.004 + rnd() * 0.006) * 60, // per second
    }))
  }, [edges])
  const pulsePos = useMemo(() => new Float32Array(PULSES * 3), [])

  useFrame((state, dt) => {
    const { camera, size } = state
    const g = group.current
    const calm = reduced.current
    const m = mouse.current
    const D = THREE.MathUtils.damp
    const narrow = size.width < 700

    // Smoothed scroll progress (set from window.scrollY / Lenis in useSmoothScroll).
    scroll.current = calm ? scrollState.progress : D(scroll.current, scrollState.progress, 3.7, dt)
    const s = scroll.current
    if (!calm) idle.current += dt * 0.08

    // Rotation: scroll + cursor (+ slow idle spin), eased with damp.
    g.rotation.y = D(g.rotation.y, s * Math.PI * 1.4 + m.x * 0.5 + idle.current, 5, dt)
    g.rotation.x = D(g.rotation.x, m.y * 0.3 + s * 0.4, 5, dt)

    // Starts offset to the right on desktop, centres as you scroll; scaled down on mobile.
    g.position.x = narrow ? 0 : 3.2 * Math.max(0, 1 - s * 3)
    g.scale.setScalar(narrow ? 0.8 : 1)
    camera.position.z = narrow ? 20 : 12
    camera.position.y = -s * 3

    pulses.forEach((p, i) => {
      if (!calm) {
        p.t += dt * p.speed
        if (p.t > 1) {
          p.t = 0
          p.edge = Math.floor(Math.random() * edges.length)
        }
      }
      const o = p.edge * 6
      for (let a = 0; a < 3; a++)
        pulsePos[i * 3 + a] = linePos[o + a] + (linePos[o + 3 + a] - linePos[o + a]) * p.t
    })
    ;(pulsePts.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true
  })

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#8b6cff" transparent opacity={0.28} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePos, 3]} />
        </bufferGeometry>
        <pointsMaterial map={tex} color="#3de0ff" size={0.55} sizeAttenuation transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <points ref={pulsePts}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pulsePos, 3]} />
        </bufferGeometry>
        <pointsMaterial map={tex} color="#ff7ad9" size={0.4} sizeAttenuation transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  )
}

export default function NeuralBackground() {
  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 12], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <Network />
    </Canvas>
  )
}
