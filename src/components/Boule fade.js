import { useState, useRef, useEffect } from "react"
import { Edges, Outlines, Line, PositionalAudio } from "@react-three/drei"

function useFadedAudio(url, fadeInTime = 2, fadeOutTime = 2) {
  const audioRef = useRef()
  const gainNodeRef = useRef()

  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current.sound
    if (!audio) return

    if (!gainNodeRef.current) {
      gainNodeRef.current = audio.context.createGain()
      audio.setNodeSource(gainNodeRef.current)
    }

    const gainNode = gainNodeRef.current
    const currentTime = audio.context.currentTime
    
    gainNode.gain.cancelScheduledValues(currentTime)
    
    gainNode.gain.setValueAtTime(0, currentTime)
    gainNode.gain.linearRampToValueAtTime(
      1, 
      currentTime + fadeInTime
    )

    return () => {
      const currentTime = audio.context.currentTime
      gainNode.gain.cancelScheduledValues(currentTime)
      gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime)
      gainNode.gain.linearRampToValueAtTime(
        0,
        currentTime + fadeOutTime  // Using longer fade out time
      )
    }
  }, [url, fadeInTime, fadeOutTime])

  return audioRef
}

export function Boule({ onSelect, scale = 0.04, color, metalness = 0.5, src, ready = false, lineColor = "black", wireframe = false, ...props }) {
  const [hovered, hover] = useState(false)
  const meshRef = useRef()
  const audioRef = useFadedAudio(src)
  
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
            autoplay
            url={src}
            distance={1}
            loop={true}
          />
        )}
      </mesh>

      {hovered && (
        <Line 
          points={[
            [props.position[0], props.position[1], props.position[2]],
            [props.position[0], props.position[1] + 1, props.position[2]]
          ]}
          color={lineColor}
          lineWidth={8}
        />
      )}
    </group>
  )
}
