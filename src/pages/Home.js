import { Link } from "react-router-dom"

export function Home() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        margin: 0
      }}>
        PARABOULES
      </h1>
      <Link 
        to="/game"
        style={{
          textDecoration: 'none',
          color: 'inherit',
          fontSize: '1.2rem'
        }}
      >
         PÉTANQUE SPATIALE / 스페이셜 페탄큐 / SPATIAL PETANQUE
      </Link>
      <Link 
        to="/drone"
        style={{
          textDecoration: 'none',
          color: 'inherit',
          fontSize: '1.2rem'
        }}
      >
        DRONE / 드론 / DRONE
      </Link>
    </div>
  )
}
