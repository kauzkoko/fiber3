import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Edges, OrbitControls, Outlines, Environment, Line, PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import { useKey } from 'react-use'

function Model({ scale = 0.04, color, metalness = 0.5, ...props }) {
  const [hovered, hover] = useState(false)
  return (
    <group>
      <mesh
        scale={scale}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        {...props}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.15} 
          metalness={metalness} 
        />
        <Edges linewidth={2} threshold={15} color={hovered ? "yellow" : "black"} />
        <Outlines thickness={hovered ? 0.05 : 0.01} color={hovered ? "yellow" : "black"} />
      </mesh>

      {/* Vertical line when hovered */}
      {hovered && (
        <Line 
          points={[
            [props.position[0], props.position[1], props.position[2]], // Start at ball center
            [props.position[0], props.position[1] + 1, props.position[2]]  // End 1m above
          ]}
          color="black"
          lineWidth={2}
        />
      )}
    </group>
  )
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <circleGeometry args={[1.5, 32]} /> {/* Reduced segments back to 32 */}
      <meshStandardMaterial 
        roughness={1}
        metalness={0}
      />
    </mesh>
  )
}

export default function App() {
  const [activeCamera, setActiveCamera] = useState('main') // To switch between cameras
  // Generate positions with minimum distance check
  const generatePositions = () => {
    const positions = [{x: 0, z: 0}] // Include center model position
    const minDistance = 0.08 // 8cm minimum distance between sphere centers
    
    while (positions.length < 7) { // 5 regular + 1 small + 1 center
      const newPos = {
        x: Math.random() * 0.6 - 0.3,
        z: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * Math.PI * 2
      }
      
      // Check distance from all existing positions
      const isTooClose = positions.some(pos => {
        const dx = newPos.x - pos.x
        const dz = newPos.z - pos.z
        const distance = Math.sqrt(dx * dx + dz * dz)
        return distance < minDistance
      })
      
      if (!isTooClose) {
        positions.push(newPos)
      }
    }
    
    return positions.slice(1) // Remove center position, return only additional positions
  }

  const additionalModels = generatePositions()

  // Get yellow ball position for top camera
  const yellowBallPos = {
    x: additionalModels[5].x,
    z: additionalModels[5].z
  }

  // Toggle camera with 'c' key
  useKey('c', () => {
    setActiveCamera(prev => prev === 'main' ? 'top' : 'main')
  })

  return (
    <Canvas shadows camera={false}> {/* Disable default camera */}
      <ambientLight intensity={Math.PI / 8} />
      <spotLight 
        intensity={Math.PI} 
        decay={0} 
        angle={0.2} 
        position={[5, 2.5, 5]} 
        castShadow
        shadow-mapSize={512}
      />
      
      {/* Main perspective camera */}
      <PerspectiveCamera
        makeDefault={activeCamera === 'main'}
        position={[-3, 1.5, 3]}
        fov={35}
      />

      {/* Top-down camera above yellow ball */}
      <PerspectiveCamera
        makeDefault={activeCamera === 'top'}
        position={[yellowBallPos.x, 2, yellowBallPos.z]}
        rotation={[-Math.PI / 2, 0, 0]} // Looking straight down
        fov={35}
      />
      
      <Floor />
      
      <Model position={[0, 0.04, 0]} rotation={[0, 0, -Math.PI / 4.45]} />
      
      {additionalModels.slice(0, 5).map((pos, index) => (
        <Model 
          key={index}
          castShadow
          color={index < 3 ? "gray" : "silver"}
          position={[pos.x, 0.04, pos.z]}
          rotation={[0, pos.rotation, -Math.PI / 4.45]}
        />
      ))}

      {/* Yellow smaller model */}
      <Model 
        castShadow
        scale={0.015}
        color="yellow"
        metalness={0.2}
        position={[yellowBallPos.x, 0.015, yellowBallPos.z]}
        rotation={[0, additionalModels[5].rotation, -Math.PI / 4.45]}
      />

      <OrbitControls makeDefault dampingFactor={0.3} />
      <Environment preset="dawn" />
    </Canvas>
  )
}
