export function Lights() {
  return (
    <>
      <ambientLight intensity={Math.PI / 8} />
      <spotLight 
        intensity={Math.PI} 
        decay={0} 
        angle={0.2} 
        position={[5, 2.5, 5]} 
      />
    </>
  )
}
