import { useForm } from "react-hook-form";
import {
  creartarea,
  borrartarea,
  actualizar,
  Recibirtarea,
} from "../api/tarea.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import miGif from "../assets/cargar.gif";
import { useQuery } from "@tanstack/react-query";

export function Mandar() {
  // Creamos en una constante un useForm para crear despues un formulario
  // y registrar cada datos para poder enviarlo.
  const {
    register, // Este registra los datos.
    handleSubmit, // El encargado de realizar el Submit con los datos.
    formState: { errors },
    setValue, // Para ponerle unos valores predeterminados.
  } = useForm();
  const navigate = useNavigate();
  const params = useParams(); // para saber el parametro que recibe.


  // Se crea esta const la cual se utilizada en el formulario, utuliza el handleSubmit
  // para recoger los datos y despues enviarlos, si recibe parametros sera editando y si
  // no los recibe sera creando una nueva
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await actualizar(params.id, data);
      navigate("/tareas");
      toast.success("Tarea editada correctamente.");
    } else {
      await creartarea(data);
      toast.success("Tarea creada correctamente.");
      navigate("/tareas");
    }
  });
  // Se crea el useQuery para recibir el API de cada tarea por separado 
  // y solo si recibe un parametro en la URL
  const {
    isLoading,
    data: tarea,
  } = useQuery({
    queryKey: ["tarea", params.id],
    queryFn: () => Recibirtarea(params.id),
    enabled: !!params.id
  });
  // Añadimos el loading para que espere mientras recibe los datos.
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={miGif} alt="Cargar" className="w-10 h-10" />
      </div>
    );
  }


  return (
    <div>
      {params.id && (
        <div className="flex justify-center">
          {setValue("title", tarea.title)}
          {setValue("description", tarea.description)}
          <div className="bg-gray-700 bg-opacity-40 p-9 rounded-lg w-1/2 mb-5">
            <h1 className="text-center font-bold mb-3">INFORMACION TAREA</h1>
            <h1 className="text-center tx-2xl font-bold  uppercase break-words">
              {tarea.title}
            </h1>
            <p className="text-center break-words">{tarea.description}</p>
            <button
              onClick={async () => {
                const aceptar = window.confirm("¿Quieres eliminar la tarea?");
                if (aceptar) {
                  await borrartarea(params.id);
                  toast.success("Tarea borrada correctamente.");
                  navigate("/tareas");
                }
              }}
              className="bg-red-500 p-3 rounded-lg w-30 mt-3 align-right mt-8"
            >
              Borrar
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        {!params.id && setValue("title", "")}
        {!params.id && setValue("description", "")}
        <div className="bg-gray-700 bg-opacity-40 p-8 rounded-lg w-1/2">
          <form onSubmit={onSubmit}>
            <h1 className="text-center font-bold mb-5">EDITAR TAREA</h1>
            <input
              type="text"
              placeholder="Titulo"
              {...register("title", { required: true })}
              className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
            />
            {errors.title && <span>Titulo no puede estar vacio</span>}
            <textarea
              rows="3"
              placeholder="Descripcion"
              {...register("description", { required: true })}
              className="bg-zinc-700 p-3 rounded-lg block w-full mb-4"
            />
            {errors.description && (
              <span>Descripcion no puede estar vacio</span>
            )}

            <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
