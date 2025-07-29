import axios from "@/lib/axiosConfig";


export const listarCategoria = (page: number ) =>{
   try{
    const response = axios.get("/categorias?page=" + page)
    return response
   }catch(error){
    console.log(error);
   }
}




export const editarCategoria = (id: number) =>{
    const response = axios.get("/categorias/" + id)
    return response;
}