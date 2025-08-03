import axios from "@/lib/axiosConfig";

export const listarPisoApi = (page: number ) =>{
   try{
    const response = axios.get("/pisos?page=" + page)
    return response
   }catch(error){
    console.log(error);
   }
}

export const ListarTodosPisosApi = () =>{
    try{
        const response = axios.get("/listarTodosPisos")
        return response
    }catch(error){
        console.log(error);
    }
}

export const crearPisoApi = (nombre: string) =>{
    const response = axios.post("/pisos", {nombre})
    return response;
}

export const editarPisoApi = (id: number) =>{
    const response = axios.get("/pisos/" + id)
    return response;
}

export const actualizarPisoApi = (id: number, nombre: string) =>{
    const response = axios.put("/pisos/" + id, {nombre})
    return response;
}

export const buscarPisoApi = (nombre: string) =>{
    const response = axios.get("/buscarPiso?buscar=" + nombre)
    return response;
}
