import { useState, useEffect, useRef } from "react"
import { PerspectiveCamera, OrbitControls, Environment } from "@react-three/drei"
import { Boule } from "./Boule"
import { Floor } from "./Floor"
import { useKey } from 'react-use' // Make sure this is imported

export function Scene({ activeCamera, ready, boules, cochonette }) {
  const [selectedBoule, setSelectedBoule] = useState(0)
  const [volume, setVolume] = useState(0.5)

  // Handle number keys 1-9
  for (let i = 1; i <= 9; i++) {
    useKey(i.toString(), () => {
      setVolume(i / 10)
    })
  }

  useKey('ArrowLeft', () => {
    setSelectedBoule(prev => {
      if (prev === null) return boules.length - 1
      return (prev - 1 + boules.length) % boules.length
    })
  })

  useKey('ArrowRight', () => {
    setSelectedBoule(prev => {
      if (prev === null) return 0
      return (prev + 1) % boules.length
    })
  })

  return (
    <>
      <ambientLight intensity={Math.PI / 8} />
      <spotLight 
        intensity={Math.PI} 
        decay={0} 
        angle={0.2} 
        position={[5, 2.5, 5]} 
      />
      
      <PerspectiveCamera
        makeDefault={activeCamera === 'main'}
        position={[-3, 1.5, 3]}
        fov={35}
      />

      <PerspectiveCamera
        makeDefault={activeCamera === 'top'}
        position={[cochonette.x, 2, cochonette.z]}
        rotation={[-Math.PI / 2, 0, 0]}
        fov={35}
      />

      <PerspectiveCamera
        makeDefault={activeCamera === 'side'}
        position={[5, 0.5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        fov={35}
      />

      <PerspectiveCamera
        makeDefault={activeCamera === 'ground'}
        position={[0, 0.1, 4]}
        fov={35}
      />

      <PerspectiveCamera
        makeDefault={activeCamera === 'player'}
        position={[0, 1.7, 6]}
        fov={35}
      />

      <PerspectiveCamera
        makeDefault={activeCamera === 'dramatic'}
        position={[-1, 0.3, 2]}
        fov={35}
      />
      
      <Floor />
            
      {boules.map((pos, index) => (
        <Boule 
          key={index}
          color={index === 0 ? "blue" : index < 3 ? "gray" : "silver"}
          wireframe={selectedBoule !== index}
          position={[pos.x, 0.04, pos.z]}
          src={"/sounds/atmo.mp3"}
          lineColor={selectedBoule === index ? "yellow" : "black"}
          ready={ready}
          onSelect={() => setSelectedBoule(index)}
          volume={selectedBoule === index ? volume : 0}
        />
      ))}

      <Boule 
        scale={0.015}
        color="yellow"
        metalness={0.2}
        position={[cochonette.x, 0.015, cochonette.z]}
      />

      <OrbitControls makeDefault dampingFactor={0.3} />
    </>
  )
}
