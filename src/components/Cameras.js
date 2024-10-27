import { PerspectiveCamera } from "@react-three/drei"
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

export function Cameras({ activeCamera, cochonette }) {

  return (
    <>
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

      <PerspectiveCamera
        makeDefault={activeCamera === 'cochonette-ultra'}
        position={[cochonette.x - 0.15, 0.05, cochonette.z - 0.15]}
        rotation={[0, Math.PI / 4, 0]}
        // fov={20}  // Very narrow FOV for extreme close-up
        fov={35}  // Very narrow FOV for extreme close-up
      />

      <PerspectiveCamera
        makeDefault={activeCamera === 'cochonette-close'}
        position={[cochonette.x - 0.3, 0.1, cochonette.z - 0.3]}
        rotation={[0, Math.PI / 4, 0]}
        // fov={25}  // Close-up view
        fov={35}  // Close-up view
      />

      <PerspectiveCamera
        makeDefault={activeCamera === 'cochonette-medium'}
        position={[cochonette.x - 0.6, 0.2, cochonette.z - 0.6]}
        rotation={[0, Math.PI / 4, 0]}
        // fov={30}  // Medium close-up
        fov={35}  // Medium close-up
      />
    </>
  )
}
