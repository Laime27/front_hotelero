import axios from "@/lib/axiosConfig";


export const listarHabitacionesApi = (page: number = 1) =>{
    const response = axios.get("/habitaciones?page=" + page)
    return response
}

export const buscarHabitacionApi = (nombre: string) =>{
    const response = axios.get("/buscarHabitacion?buscar=" + nombre)
    return response
}


export const crearHabitacionApi = (data: any) =>{
    const response = axios.post("/habitaciones", data)
    return response
}









