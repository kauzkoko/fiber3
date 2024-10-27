import { useState } from "react"
import { Edges, Outlines, Line } from "@react-three/drei"

export function Boule({ scale = 0.04, color, metalness = 0.5, ...props }) {
  const [hovered, hover] = useState(false)
  return (
    <group>
      <mesh
        scale={scale}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        {...props}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.15} 
          metalness={metalness} 
        />
        <Edges linewidth={2} threshold={15} color={hovered ? "yellow" : "black"} />
        <Outlines thickness={hovered ? 0.05 : 0.01} color={hovered ? "yellow" : "black"} />
      </mesh>

      {hovered && (
        <Line 
          points={[
            [props.position[0], props.position[1], props.position[2]],
            [props.position[0], props.position[1] + 1, props.position[2]]
          ]}
          color="black"
          lineWidth={2}
        />
      )}
    </group>
  )
}
