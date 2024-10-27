import { useState, useRef, useEffect } from "react"
import { Edges, Outlines, Line, PositionalAudio } from "@react-three/drei"

function useAudio(url, volume = 1) {
  const audioRef = useRef()
  
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.setVolume(volume)
    audioRef.current.play()
  }, [url, volume])

  return audioRef
}

export function Boule({ onSelect, scale = 0.04, color, metalness = 0.5, src, ready = false, lineColor = "black", wireframe = false, volume = 0.1, ...props }) {
  const [hovered, hover] = useState(false)
  const meshRef = useRef()
  const audioRef = useAudio(src, volume)
  
  return (
    <group>
      <mesh 
        ref={meshRef}
        scale={scale}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        onClick={(e) => {
          e.stopPropagation()
          onSelect?.()
        }}
        {...props}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial 
          roughness={0.15} 
          metalness={metalness} 
          wireframe={wireframe}
        />
        <Edges linewidth={2} threshold={15} color={hovered ? "yellow" : "black"} />
        <Outlines thickness={hovered ? 0.05 : 0.01} color={hovered ? "yellow" : "black"} />
        
        {src && ready && (
          <PositionalAudio 
            ref={audioRef}
            url={src}
            distance={1}
            loop={true}
          />
        )}
      </mesh>
    </group>
  )
}
