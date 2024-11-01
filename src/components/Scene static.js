import { PerspectiveCamera, OrbitControls, Environment } from "@react-three/drei"
import { Boule } from "./Boule"
import { Floor } from "./Floor"

export function Scene({ activeCamera, ready, boules, cochonette }) {
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
      
      <Floor />
            
      {boules.map((pos, index) => (
        <Boule 
          key={index}
          color={index === 0 ? "blue" : index < 3 ? "gray" : "silver"}
		  wireframe={index !== 0}
          position={[pos.x, 0.04, pos.z]}
          src={index === 0 ? "/sounds/atmo.mp3" : undefined}
          lineColor={index === 0 ? "yellow" : "black"}
          ready={ready}
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
