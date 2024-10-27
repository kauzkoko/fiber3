import { useState, useMemo } from "react"
import { Canvas } from "@react-three/fiber"
import { useKey } from 'react-use'
import { Scene } from "./components/Scene"
import { useBoulePositions } from "./hooks/useBoulePositions"

export default function App() {
  const [activeCamera, setActiveCamera] = useState('main')
  const [ready, setReady] = useState(false)
  
  const { boules, cochonette } = useMemo(() => 
    useBoulePositions({amount: 5}), 
    [] 
  )

  useKey('c', () => {
    setActiveCamera(prev => prev === 'main' ? 'top' : 'main')
  })

  useKey('r', () => {
    setReady(true)
  })

  return (
    <Canvas camera={false}>
      <Scene 
        activeCamera={activeCamera}
        ready={ready}
        boules={boules}
        cochonette={cochonette}
      />
    </Canvas>
  )
}
