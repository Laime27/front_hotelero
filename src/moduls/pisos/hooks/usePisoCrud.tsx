import { useState } from "react";
import {
  crearPisoApi,
  editarPisoApi,
  actualizarPisoApi,
} from "../servicios/pisoService";
import { toast } from "sonner";

export default function usePisoCrud() {
  const [loading, setLoading] = useState(false);

  const obtenerPiso = async (id: number) => {
    try {
      const { data } = await editarPisoApi(id);
      return data;
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener el piso");
    }
  };

  const crearPiso = async (nombre:string) => {
    setLoading(true);
    try {
      const response = await crearPisoApi(nombre);
      if (response?.status === 201) {
        toast.success("Piso creado exitosamente");
      } else {
        toast.error("No se pudo crear el piso");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el piso");
    } finally {
      setLoading(false);
    }
  };

  const actualizarPiso = async (id: number, nombre:string) => {
    setLoading(true);
    try {
      const response = await actualizarPisoApi(id, nombre);
      if (response?.status === 200) {
        toast.success("Piso actualizado exitosamente");
      } else {
        toast.error("No se pudo actualizar el piso");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el piso");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    obtenerPiso,
    crearPiso,
    actualizarPiso,
  };
}
