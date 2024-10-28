import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, Game, Drone } from "./pages"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/drone" element={<Drone />} />
      </Routes>
    </BrowserRouter>
  )
}
