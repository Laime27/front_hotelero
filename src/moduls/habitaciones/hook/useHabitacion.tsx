import { useState } from "react";
import { ListarTodasCategoriasApi } from "@/moduls/categorias/service/categoriaService";
import type { CategoriaType } from "@/moduls/categorias/type/categoriaType";
import { ListarTodosPisosApi } from "@/moduls/pisos/servicios/pisoService";
import type pisoType from "@/moduls/pisos/type/pisoType";

export function useHabitaciones() {

   const [categorias, setCategorias] = useState<CategoriaType[]>([]);
   const [pisos, setPisos] = useState<pisoType[]>([]);
   
  const listarCategorias = async () => {
    try {
      const response = await ListarTodasCategoriasApi();
      if (response?.status === 200) {
        setCategorias(response.data);
      }
    } catch (error) {
      console.error("Error al listar categorías:", error);
    }
  };

  const listarPisos = async () => {
    try {
      const response = await ListarTodosPisosApi();
      if (response?.status === 200) {
        setPisos(response.data);
      }
    } catch (error) {
      console.error("Error al listar pisos:", error);
    }
  };
 

  return {
    listarCategorias,
    listarPisos,
    categorias,
    pisos,
  };
}
