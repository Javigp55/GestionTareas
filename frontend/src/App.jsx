import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { Recibir } from "./pages/Recibir"
import { Mandar } from "./pages/Mandar"
import { Navigation } from "./components/Navigation"
import { Toaster } from 'react-hot-toast'

function App() {
  return (
      <BrowserRouter>
        <div className="container mx-auto">
          <Navigation />
          <Routes>
          <Route path="/" element={<Navigate to={'/tareas'} />} />
          <Route path="/tareas" element={<Recibir />} />
            <Route path="/crear-tarea" element={<Mandar />} />
            <Route path="/tarea/:id" element={<Mandar />} />
          </Routes>
          <Toaster/>

        </div>
      </BrowserRouter>

  )
    
  }

export default App
