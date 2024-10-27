import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, Game } from "./pages"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}
