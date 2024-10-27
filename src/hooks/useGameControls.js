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

  // Volume controls (1-9)
  for (let i = 1; i <= 9; i++) {
    useKey(i.toString(), () => {
      setVolume(i / 10)
    })
  }

  // Boule selection
  useKey('ArrowLeft', () => {
    setSelectedBoule(prev => {
      if (prev === null) return boules.length - 1
      return (prev - 1 + boules.length) % boules.length
    })
  })

  useKey('ArrowRight', () => {
    setSelectedBoule(prev => {
      if (prev === null) return 0
      return (prev + 1) % boules.length
    })
  })

  return {
    selectedBoule,
    setSelectedBoule,
    volume
  }
}
