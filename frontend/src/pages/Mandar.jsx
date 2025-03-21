import { useForm } from "react-hook-form";
import {
  creartarea,
  borrartarea,
  actualizar,
  Recibirtarea,
} from "../api/tarea.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export function Mandar() {
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

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

  useEffect(() => {
    async function cargarTarea() {
      if (params.id) {
        const res = await Recibirtarea(params.id);
        setValue("title", res.data.title);
        setValue("description", res.data.description);
        setTitulo(res.data);
        setLoading(false);
      }
    }
    cargarTarea();
  }, []);
  if (loading == true) {
    if (params.id) {
      return <div></div>;
    }
  }
  return (
    <div>
      {params.id && (
        <div className="flex justify-center">
          <div className="bg-gray-700 bg-opacity-40 p-9 rounded-lg w-1/2 mb-5">
            <h1 className="text-center font-bold mb-3">INFORMACION TAREA</h1>
            <h1 className="text-center tx-2xl font-bold  uppercase break-words">
              {titulo.title}
            </h1>
            <p className="text-center break-words">{titulo.description}</p>
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
