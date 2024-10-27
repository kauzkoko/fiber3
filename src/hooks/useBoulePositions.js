export function useBoulePositions({ amount = 5 } = {}) {  // Destructure object param with default
  const generatePositions = () => {
    const positions = []
    const minDistance = 0.08
    const centerExclusionRadius = 0.03
    
    while (positions.length < amount) {  // Use amount instead of count
      const newPos = {
        x: Math.random() * 0.6 - 0.3,
        z: Math.random() * 0.6 - 0.3,
      }
      
      const distanceToCenter = Math.sqrt(newPos.x * newPos.x + newPos.z * newPos.z)
      if (distanceToCenter < centerExclusionRadius) continue
      
      const isTooClose = positions.some(pos => {
        const dx = newPos.x - pos.x
        const dz = newPos.z - pos.z
        const distance = Math.sqrt(dx * dx + dz * dz)
        return distance < minDistance
      })
      
      if (!isTooClose) {
        positions.push(newPos)
      }
    }
    
    return positions
  }

  const boules = generatePositions()
  const cochonette = { x: 0, z: 0 }

  return { boules, cochonette }
}
