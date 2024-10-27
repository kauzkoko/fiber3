import { useState, useMemo } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Canvas } from "@react-three/fiber"
import { useKey } from 'react-use'
import { Scene } from "./components/Scene"
import { useBoulePositions } from "./hooks/useBoulePositions"

const Home = () => {
  return (
    <div>
      <h1>Welcome to Petanque</h1>
      <Link to="/game">Play Game</Link>
    </div>
  )
}

const Game = () => {
  const cameras = ['main', 'top', 'side', 'player', 'dramatic', 'ground']
  const [activeCamera, setActiveCamera] = useState(cameras[0])
  const [ready, setReady] = useState(false)
  
  const { boules, cochonette } = useMemo(() => 
    useBoulePositions({amount: 5}), 
    [] 
  )

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}
