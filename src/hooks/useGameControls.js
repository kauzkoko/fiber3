import { useState, useEffect } from 'react'
import { useKey } from 'react-use'
import { CAMERAS } from '../constants/cameras'

export function useGameControls(boules) {
  const [selectedBoule, setSelectedBoule] = useState(null)
  const [volume, setVolume] = useState(0.1)
  const cameras = CAMERAS
  const [activeCamera, setActiveCamera] = useState(cameras[0])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (ready) {
      setSelectedBoule(0)
    }
  }, [ready])

  const increaseSelectedBoule = () => {
    setSelectedBoule(prev => {
      if (prev === null) return 0
      return (prev + 1) % boules.length
    })
  }

  const decreaseSelectedBoule = () => {
    setSelectedBoule(prev => {
      if (prev === null) return boules.length - 1
      return (prev - 1 + boules.length) % boules.length
    })
  }
  
  const switchCamera = () => {
    setActiveCamera(prev => {
      const currentIndex = cameras.indexOf(prev)
      const nextIndex = (currentIndex + 1) % cameras.length
      return cameras[nextIndex]
    })
  }

  for (let i = 1; i <= 9; i++) {
    useKey(i.toString(), () => {
      setVolume(i / 10)
    })
  }

  useKey('c', () => {
    console.log('Switching camera')
    switchCamera()
  })

  useKey('r', () => {
    setReady(prev => !prev)
  })

  useKey('ArrowLeft', decreaseSelectedBoule)
  useKey('ArrowRight', increaseSelectedBoule)

  return {
    selectedBoule,
    setSelectedBoule,
    volume,
    increaseSelectedBoule,
    decreaseSelectedBoule,
    activeCamera,
    setActiveCamera,
    ready,
    setReady,
    cameras,
    switchCamera
  }
}
