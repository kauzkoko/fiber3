export function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <circleGeometry args={[1, 12]} />
      <meshStandardMaterial 
        roughness={1}
        metalness={0}
		wireframe
      />
    </mesh>
  )
}
