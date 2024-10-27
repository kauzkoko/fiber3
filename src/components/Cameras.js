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
    </>
  )
}
