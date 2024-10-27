import { useState, useEffect } from 'react'
import { useKey } from 'react-use'

export function useGameControls(boules, ready) {
  const [selectedBoule, setSelectedBoule] = useState(null)
  const [volume, setVolume] = useState(0.1)

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

  for (let i = 1; i <= 9; i++) {
    useKey(i.toString(), () => {
      setVolume(i / 10)
    })
  }

  useKey('ArrowLeft', decreaseSelectedBoule)
  useKey('ArrowRight', increaseSelectedBoule)

  return {
    selectedBoule,
    setSelectedBoule,
    volume,
    increaseSelectedBoule,
    decreaseSelectedBoule
  }
}
