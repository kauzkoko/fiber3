import { useState, useEffect, useRef } from "react"
import { PerspectiveCamera, OrbitControls, Environment } from "@react-three/drei"
import { Boule } from "./Boule"
import { Floor } from "./Floor"
import { useKey } from 'react-use' 
import { Cameras } from "./Cameras" 
import { Lights } from "./Lights"
import { useGameControls } from '../hooks/useGameControls'

export function Scene({ activeCamera, ready, boules, cochonette }) {
  const { selectedBoule, volume } = useGameControls(boules, ready)

  return (
    <>
      <Lights />
      <Cameras activeCamera={activeCamera} cochonette={cochonette} />
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
          playing={selectedBoule === index}
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
