import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Edges, OrbitControls, Outlines, Environment, Line } from "@react-three/drei"
import * as THREE from "three"

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
        <Edges linewidth={2} threshold={15} color={hovered ? "#c02040" : "black"} />
        <Outlines thickness={hovered ? 0.02 : 0.01} color={hovered ? "#c02040" : "black"} />
      </mesh>

      {/* Vertical line when hovered */}
      {hovered && (
        <Line 
          points={[
            [props.position[0], props.position[1], props.position[2]], // Start at ball center
            [props.position[0], props.position[1] + 1, props.position[2]]  // End 1m above
          ]}
          color="white"
          lineWidth={1}
        />
      )}
    </group>
  )
}

function Floor() {
  const maps = useTexture({
    map: "/textures/floor/rock_ground_02_diff_1k.jpg",
    normalMap: "/textures/floor/rock_ground_02_nor_gl_1k.jpg",
    roughnessMap: "/textures/floor/rock_ground_02_rough_1k.jpg",
    aoMap: "/textures/floor/rock_ground_02_ao_1k.jpg",
  })

  // Scale all textures
  Object.values(maps).forEach(texture => {
    texture.repeat.set(4, 4)  // Repeat texture 4 times
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <circleGeometry args={[1.5, 32]} /> {/* Reduced segments back to 32 */}
      <meshStandardMaterial 
        {...maps}
        roughness={1}
        metalness={0}
      />
    </mesh>
  )
}

export default function App() {
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

  return (
    <Canvas shadows camera={{ position: [-3, 1.5, 3], fov: 35 }}>
      <ambientLight intensity={Math.PI / 8} />
      <spotLight 
        intensity={Math.PI} 
        decay={0} 
        angle={0.2} 
        position={[5, 2.5, 5]} 
        castShadow
        shadow-mapSize={512}
      />
      
      <Floor />
      
      <Model 
        castShadow
        position={[0, 0.04, 0]} 
        rotation={[0, 0, -Math.PI / 4.45]} 
      />
      
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
        position={[additionalModels[5].x, 0.015, additionalModels[5].z]}
        rotation={[0, additionalModels[5].rotation, -Math.PI / 4.45]}
      />

      <OrbitControls makeDefault dampingFactor={0.3} />
      <Environment preset="dawn" />
    </Canvas>
  )
}

useGLTF.preload("/textures/floor/rock_ground_02_1k.gltf")
