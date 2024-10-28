import { useRef } from 'react'
import { Box } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Drone({ position }) {
  const droneRef = useRef()
//   const targetPos = useRef(new THREE.Vector3(...position))

//   useFrame(() => {
//     if (!droneRef.current) return

//     // Update target position
//     targetPos.current.set(...position)

//     // Smooth interpolation
//     droneRef.current.position.lerp(targetPos.current, 0.1)
//   })

  return (
    <Box 
      ref={droneRef}
      args={[0.3, 0.1, 0.3]}
      position={position}
    >
      <meshStandardMaterial 
        color="black"
        metalness={0.6}
        roughness={0.2}
      />
    </Box>
  )
}
