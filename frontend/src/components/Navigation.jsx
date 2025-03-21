import { Link } from "react-router-dom"
import React from "react"

export const Navigation = React.memo(() => {
  return (
    <div className="flex justify-center items-center py-5 sticky">
        
        <Link to="/tareas" className="px-3 py-2 bg-indigo-500 rounded-lg mr-3"><button>Tareas</button></Link>

        <Link to="/crear-tarea" className="px-3 py-2 bg-indigo-500 rounded-lg mr-3"><button>Registrar Tarea</button>
        </Link>
        
    </div>
  )
})


export default Navigation