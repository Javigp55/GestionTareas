import { useNavigate } from "react-router-dom";
import { fijado } from "../api/tarea.api";
import { toast } from "react-hot-toast";


//Esta funcion recibe el parametro task de Recibirtareas.jsx
export function Tarjeta({ task }) {
  const navigate = useNavigate(); //Redireccion
  const botonFijar = async (event) => {
    //Para que el boton de fijar no herede la propiedad onClick del div
    event.stopPropagation();
    const res = await fijado(task.id);
    res
    if (res.data['error'])
      toast.error("No puedes tener mas de 3 tareas fijadas.")
    else if (res.data['id'] == 0){
      toast.success("Tarea fijada.");
      navigate("/")}

    else if (res.data['id'] == 1){
      toast.success("Tarea desfijada.")
      navigate("/")}
    
  }

  return (
    <div //Div que engloba cada tarea
      className="bg-gray-700 bg-opacity-40 p-8 rounded-lg hover:bg-gray-500 h-[220px]"
      onClick={() => {
        // Cuando se pulsa encima del div se redireccion a tarea/:id
        navigate("/tarea/" + task.id);
      }}
    >
      {task.done ? (
        <button onClick={botonFijar}>AA</button>
      ) : (
        <button onClick={botonFijar}>EE</button>
      )}
      <h1 className="text-center tx-2xl font-bold mb-2 uppercase line-clamp-1 break-words">
        {task.title}
      </h1>
      <p className="text-center line-clamp-5 break-words">{task.description}</p>
    </div>
  );
}
