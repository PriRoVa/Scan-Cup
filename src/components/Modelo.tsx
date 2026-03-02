import { useLoader, useFrame } from '@react-three/fiber'
import { OBJLoader } from 'three-stdlib'
import { TextureLoader } from 'three'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

interface ModeloProps {
  textureId: string
}

export default function Modelo({ textureId }: ModeloProps) {
  const trackingRef = useRef<THREE.Group>(null!)
  const animationRef = useRef<THREE.Group>(null!)

  const obj = useLoader(OBJLoader, '/models/cromo.obj')

  const resolvePath = (suffix: string) =>
    `/textures/${textureId}_${suffix}.png`

  const texFront = useLoader(TextureLoader, resolvePath('1'))
  const texBack = useLoader(TextureLoader, resolvePath('2'))

  // Crear modelo con frente y reverso reales
  const model = useMemo(() => {
    const group = new THREE.Group()

    obj.traverse((child: any) => {
      if (!child.isMesh) return

      const geometry = child.geometry.clone()

      // Material frente
      const frontMaterial = new THREE.MeshStandardMaterial({
        map: texFront,
        side: THREE.FrontSide,
      })

      // Material reverso
      const backMaterial = new THREE.MeshStandardMaterial({
        map: texBack,
        side: THREE.BackSide,
      })

      const frontMesh = new THREE.Mesh(geometry, frontMaterial)
      const backMesh = new THREE.Mesh(geometry, backMaterial)

      group.add(frontMesh)
      group.add(backMesh)
    })

    return group
  }, [obj, texFront, texBack])

  const targetPosition = useRef(new THREE.Vector3())

  useFrame((state: any, delta: number) => {
    if (!trackingRef.current || !animationRef.current) return

    trackingRef.current.visible = true

    // Ahora el modelo siempre va al centro, sin importar dónde esté el QR
    targetPosition.current.set(0, 0, 0)

    // Movimiento ULTRA fluido hacia el centro
    const damping = 1 - Math.exp(-15 * delta)
    trackingRef.current.position.lerp(targetPosition.current, damping)

    // ROTACIÓN Y FLOTACIÓN (solo cuando no hay qrData para centrarse, o rotar siempre de otra forma? 
    // Vamos a rotar sobre su propio eje.
    animationRef.current.rotation.y += delta * 1.5

    // Flotación constante suave
    animationRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.15
  })

  // Agregamos un grupo intermedio que lo gire un poco hacia arriba para que se vea mejor la carta (inclinación)
  // Y reducimos la rotación x para que no esté totalmente plana
  return (
    <group ref={trackingRef} scale={[1.1, 1.1, 1.1]}>
      <group rotation={[Math.PI / -8, 0, 0]}>
        <group ref={animationRef}>
          <primitive object={model} />
        </group>
      </group>
    </group>
  )
}