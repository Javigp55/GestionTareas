import axios from "axios";

const Api = axios.create({
  baseURL: "https://react-django-gestion-tareas.vercel.app/tasks/api/",
});

export const Recibirapi = async () => {
  const res = await Api.get("task/");
  return res.data;
};

export const Recibirtarea = async (id) => {
  const res = await Api.get("task/" + id + "/");
  return res.data;
};

export const creartarea = (task) => {
  return Api.post("task/", task);
};

export const borrartarea = (id) => {
  return Api.delete("task/" + id + "/");
};

export const actualizar = (id, task) => {
  return Api.put("task/" + id + "/", task);
};

export const fijado = async (id) => {
  const res = await Api.patch(id + "/fijar/");
  return res;
};
