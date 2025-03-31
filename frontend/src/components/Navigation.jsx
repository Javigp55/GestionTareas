import { Link, useNavigate } from "react-router-dom"
import React ,{useState}from "react"
import { logout } from "../api/tarea.api"
import Cookies from 'js-cookie'
import Logo from "../assets/logo.png"


export const Navigation = React.memo(() => {

const [Abierto, setAbierto] = useState(false)
  const navigate = useNavigate()
  const boton = () => {
    Cookies.remove("Auth", { path: '/' });
    logouut()
    setAbierto(false)
  }

  const logouut = async () =>{
    await logout();
    navigate("/")
  }
  const cookies = Cookies.get("Auth")
  return (
    <div>
    <div className="flex justify-center items-center bg-white py-3 border-b-2 border-gray-300">
      <div className="ml-10 mr-auto">
       <Link to="/"> <img src={Logo} alt="Logo" className="max-w-30" /></Link>
      </div>
      
      {cookies ? (
        <div>
        <div className="hidden sm:flex justify-center ml-auto items-center mr-10">
      <Link to="/tareas" className="mr-5"><button className="cursor-pointer font-light text-sm text-gray-700 hover:text-lime-400 transition-colors duration-300">Mis tareas</button></Link>
      <Link to="/crear-tarea" className="mr-5"><button className="cursor-pointer font-light text-sm text-gray-700 hover:text-lime-400 transition-colors duration-300">Añadir tarea</button></Link>    
      <Link to="/perfil" className="mr-5"><button className="cursor-pointer font-light text-sm text-gray-700 hover:text-lime-400 transition-colors duration-300">Mi perfil</button></Link>    

      <div className="flex items-center">
      <span className="material-icons text-gray-700 hover:text-lime-400 transition-colors duration-300 cursor-pointer"onClick={boton}>
          logout
        </span>
      </div>
      </div>
        <div className="md:hidden cursor-pointer " onClick={() => setAbierto(!Abierto)}>
        <span className="material-icons mr-5"role="menu" >{Abierto ? "close" : "menu"}</span>

        </div>

      </div>
) : (

  
  <div className="ml-auto mr-10">

    <Link to="/login"><button className="cursor-pointer font-light text-sm text-gray-700 hover:text-lime-400 transition-colors duration-300">Iniciar Sesion</button></Link>
  </div>
)}
   



    </div>
    {Abierto && (
      <div className=" flex items-center justify-center  bg-gray-50 border-b-2 border-gray-300 rounded-b-lg">
        <div className="md:hidden justify-center items-center p-4  grid grid-cols-1 gap-3 ">
        <Link className="flex active:text-lime-100 transition-all duration-200" to="/tareas" onClick={() => setAbierto(false)}><span>Mis Tareas</span></Link>
        <Link className="flex active:text-lime-100 transition-all duration-200" to="/crear-tarea" onClick={() => setAbierto(false)}><span>Añadir tarea</span></Link>
        <Link className="flex active:text-lime-100 transition-all duration-200" to="/perfil" onClick={() => setAbierto(false)}><span>Mi perfil</span></Link>
        <span className="flex active:text-lime-100 transition-all duration-200" onClick={boton}>Log Out</span>
        </div>
      </div>

   )}



    </div>
  )
})


export default Navigation