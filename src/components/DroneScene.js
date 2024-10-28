import { useState, useEffect, useRef, useMemo } from "react"
import { PerspectiveCamera, OrbitControls, Environment } from "@react-three/drei"
import { Boule } from "./Boule"
import { Floor } from "./Floor"
import { useKey } from 'react-use' 
import { Cameras } from "./Cameras" 
import { Lights } from "./Lights"
import { useGameControls } from '../hooks/useGameControls'
import { Drone } from "./Drone"

export function DroneScene({ activeCamera, ready, boules, cochonette }) {
  const { selectedBoule, setSelectedBoule, volume, increaseSelectedBoule, decreaseSelectedBoule, boulePositions } = useGameControls(boules, ready)
  const [cameraChangedRecently, setCameraChangedRecently] = useState(false)

  useEffect(() => {
    console.log('Active camera changed to:', activeCamera)
    setCameraChangedRecently(true)
    
    const timeout = setTimeout(() => {
      setCameraChangedRecently(false)
      increaseSelectedBoule()
      setTimeout(() => {
        decreaseSelectedBoule()
      }, 5)
    }, 5)

    return () => clearTimeout(timeout)
  }, [activeCamera])

  // Calculate drone position above the selected boule or cochonette
  const dronePosition = useMemo(() => {
    if (selectedBoule === null) {
      // Default position above cochonette
      return [cochonette.x, 1.5, cochonette.z]
    }
    // Position above selected boule
    const targetBoule = boules[selectedBoule]
    return [targetBoule.x, 1.5, targetBoule.z]
  }, [selectedBoule, boulePositions, cochonette])

  const lookAtPosition = useMemo(() => {
    if (selectedBoule === null) {
      return [cochonette.x, 0, cochonette.z]
    }
    const targetBoule = boules[selectedBoule]
    return [targetBoule.x, 0, targetBoule.z]
  }, [selectedBoule, boules, cochonette])

  return (
    <>
      <Lights />
      <Cameras activeCamera={activeCamera} cochonette={cochonette} dronePosition={dronePosition} />
      <Floor />
      
      {boules.map((pos, index) => (
        <Boule 
          key={index}
          color={index === 0 ? "blue" : index < 3 ? "gray" : "silver"}
          wireframe={selectedBoule !== index}
          position={[pos.x, 0.04, pos.z]}
          src={"/sounds/shortdeep.mp3"}
          lineColor={selectedBoule === index ? "black" : "black"}
          ready={ready}
          onSelect={() => setSelectedBoule(index)}
          playing={selectedBoule === index}
          volume={selectedBoule === index ? volume : 0}
          cameraChangedRecently={cameraChangedRecently}
          selectedBoule={index}
        />
      ))}

      <Boule 
        scale={0.015}
        color="yellow"
        metalness={0.2}
        src={"/sounds/atmo.mp3"}
        volume={0.1}
        ready={ready}
        position={[cochonette.x, 0.015, cochonette.z]}
        activeCamera={activeCamera}
        selectedBoule={"Cochonette"}
      />

      <Drone 
        position={dronePosition} 
        lookAt={lookAtPosition}
      />

      <OrbitControls makeDefault dampingFactor={0.3} />
    </>
  )
}
