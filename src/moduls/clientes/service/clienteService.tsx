import axios from "@/lib/axiosConfig";

export const listarClienteApi = (page: number ) =>{
   try{
    const response = axios.get("/clientes?page=" + page)
    return response
   }catch(error){
    console.log(error);
   }
}

export const ListarTodosClientesApi = () =>{
    try{
        const response = axios.get("/listarTodosClientes")
        return response
    }catch(error){
        console.log(error);
    }
}

export const crearClienteApi = (cliente: any) =>{
    const response = axios.post("/clientes", cliente)
    return response;
}

export const editarClienteApi = (id: number) =>{
    const response = axios.get("/clientes/" + id)
    return response;
}

export const actualizarClienteApi = (id: number, cliente: any) =>{
    const response = axios.put("/clientes/" + id, cliente)
    return response;
}

export const buscarClienteApi = (buscar: string) =>{
    const response = axios.get("/buscarCliente?buscar=" + buscar)
    return response;
}
