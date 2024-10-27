import { useState, useMemo } from "react"
import { Canvas } from "@react-three/fiber"
import { useKey } from 'react-use'
import { Scene } from "../components/Scene"
import { useBoulePositions } from "../hooks/useBoulePositions"

export function Game() {
  const cameras = ['main', 'top', 'side', 'player', 'dramatic', 'ground']
  const [activeCamera, setActiveCamera] = useState(cameras[0])
  const [ready, setReady] = useState(false)
  
  const { boules, cochonette } = useMemo(() => useBoulePositions({ amount: 5 }), [])

  useKey('c', () => {
    setActiveCamera(prev => {
      const currentIndex = cameras.indexOf(prev)
      const nextIndex = (currentIndex + 1) % cameras.length
      return cameras[nextIndex]
    })
  })

  useKey('r', () => {
    setReady(true)
  })

  return (
    <>
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontFamily: 'monospace',
        zIndex: 1000
      }}>
        Camera: {activeCamera}
      </div>
      
      <Canvas camera={false}>
        <Scene 
          activeCamera={activeCamera}
          ready={ready}
          boules={boules}
          cochonette={cochonette}
        />
      </Canvas>
    </>
  )
}
