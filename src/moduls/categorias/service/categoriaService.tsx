import axios from "@/lib/axiosConfig";


export const listarCategoriaApi = (page: number ) =>{
   try{
    const response = axios.get("/categorias?page=" + page)
    return response
   }catch(error){
    console.log(error);
   }
}

export const ListarTodasCategoriasApi = () =>{
    try{
        const response = axios.get("/listarTodasCategorias")
        return response
    }catch(error){
        console.log(error);
    }
}

export const crearCategoriaApi = (nombre: string) =>{
    const response = axios.post("/categorias", {nombre})
    return response;
}

export const editarCategoriaApi = (id: number) =>{
    const response = axios.get("/categorias/" + id)
    return response;
}

export const actualizarCategoriaApi = (id: number, nombre: string) =>{
    const response = axios.put("/categorias/" + id, {nombre})
    return response;
}

export const buscarCategoriaApi = (nombre: string) =>{
    const response = axios.get("/buscarCategoria?buscar=" + nombre)
    return response;
}