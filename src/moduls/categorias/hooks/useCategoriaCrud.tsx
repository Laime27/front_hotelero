import { useState } from "react";
import {
  crearCategoriaApi,
  editarCategoriaApi,
  actualizarCategoriaApi,
} from "../service/categoriaService";
import { toast } from "sonner";

export default function useCategoriaCrud() {
  const [loading, setLoading] = useState(false);

  const obtenerCategoria = async (id: number) => {
    try {
      const { data } = await editarCategoriaApi(id);
      return data;
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener la categoría");
    }
  };

  const crearCategoria = async (nombre: string) => {
    setLoading(true);
    try {
      const response = await crearCategoriaApi(nombre);
      if (response?.status === 201) {
        toast.success("Categoría creada exitosamente");
      } else {
        toast.error("No se pudo crear la categoría");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al crear la categoría");
    } finally {
      setLoading(false);
    }
  };

  const actualizarCategoria = async (id: number, nombre: string) => {
    setLoading(true);
    try {
      const response = await actualizarCategoriaApi(id, nombre);
      if (response?.status === 200) {
        toast.success("Categoría actualizada exitosamente");
      } else {
        toast.error("No se pudo actualizar la categoría");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar la categoría");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
  };
}
