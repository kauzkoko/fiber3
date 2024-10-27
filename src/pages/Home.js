import { Link } from "react-router-dom"

export function Home() {
  return (
    <div>
      <h1>Welcome to Petanque</h1>
      <Link to="/game">Play Game</Link>
    </div>
  )
}
