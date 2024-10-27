import { PerspectiveCamera, OrbitControls, Environment, PositionalAudio } from "@react-three/drei"
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
        castShadow
        shadow-mapSize={512}
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
          castShadow
          color={index < 3 ? "gray" : "silver"}
          position={[pos.x, 0.04, pos.z]}
        />
      ))}

      <Boule 
        castShadow
        scale={0.015}
        color="yellow"
        metalness={0.2}
        position={[cochonette.x, 0.015, cochonette.z]}
      />
      {ready && (
        <PositionalAudio 
          autoplay 
          loop 
          url="/sounds/another brick in the wall.mp3" 
          distance={.3}
        />
      )}

      <OrbitControls makeDefault dampingFactor={0.3} />
      <Environment preset="dawn" />
    </>
  )
}
