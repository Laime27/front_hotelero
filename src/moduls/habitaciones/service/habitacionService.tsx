import axios from "@/lib/axiosConfig";


export const listarHabitacionesApi = (page: number = 1) =>{
    const response = axios.get("/habitaciones?page=" + page)
    return response
}

export const buscarHabitacionApi = (nombre: string) =>{
    const response = axios.get("/buscarHabitacion?buscar=" + nombre)
    return response
}

export const filtrosHabitacionesApi = (data: any) => {
    return axios.get("/filtrosHabitacion", {
      params: data
    });
  };

export const actualizarHabitacionApi = (id: number, data: any) => {
    return axios.put(`/habitaciones/${id}`, data);
}

export const crearHabitacionApi = (data: any) =>{
    const response = axios.post("/habitaciones", data)
    return response
}

export const ObtenerHabitacionApi = (id: number) =>{
    const response = axios.get("/habitaciones/" + id)
    return response; 
    
}








