import { useState } from "react";
import {
  crearClienteApi,
  editarClienteApi,
  actualizarClienteApi,
} from "../service/clienteService";
import { toast } from "sonner";

export default function useClienteCrud() {
  const [loading, setLoading] = useState(false);

  const obtenerCliente = async (id: number) => {
    try {
      const { data } = await editarClienteApi(id);
      return data;
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener el cliente");
    }
  };

  const crearCliente = async (data: any) => {
    setLoading(true);
    try {
      const response = await crearClienteApi(data);
      if (response?.status === 201) {
        toast.success("Cliente creado exitosamente");
      } else {
        toast.error("No se pudo crear el cliente");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el cliente");
    } finally {
      setLoading(false);
    }
  };

  const actualizarCliente = async (id: number, data: any) => {
    setLoading(true);
    try {
      const response = await actualizarClienteApi(id, data);
      if (response?.status === 200) {
        toast.success("Cliente actualizado exitosamente");
      } else {
        toast.error("No se pudo actualizar el cliente");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el cliente");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    obtenerCliente,
    crearCliente,
    actualizarCliente,
  };
}
