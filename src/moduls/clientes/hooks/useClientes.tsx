import { useState } from "react";
import { listarClienteApi, buscarClienteApi } from "../service/clienteService";
import type { ClienteType } from "../type/clienteType";

export default function useClientes() {
  const [clientes, setClientes] = useState<ClienteType[]>([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [lastPage, setLastPage] = useState(1);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);

  const listarClientes = async (page: number = 1) => {
      try {
        setLoading(true);
        const response = await listarClienteApi(page);
        if (response?.status === 200) {
          setClientes(response.data.data);
          setLastPage(response.data.last_page);
          setCurrentPage(response.data.current_page);
        } else {
          setError(true);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const cambiarPagina = (nuevaPagina: number) => {
        if (nuevaPagina > 0 && nuevaPagina <= lastPage) {
          setCurrentPage(nuevaPagina);
        }
      };

      const buscarClientes = async (nombre: string) => {
        try {
          setLoading(true);
          const response = await buscarClienteApi(nombre);
          if (response?.status === 200) {
            setClientes(response.data.data);
            setLastPage(response.data.last_page);
          } else {
            setError(true);
          }
        } catch (error) {
          console.log(error);
          setError(true);
        } finally {
          setLoading(false);
        }
      };


  return { listarClientes, clientes, cambiarPagina, loading, lastPage, currentPage, error, buscarClientes };
}
