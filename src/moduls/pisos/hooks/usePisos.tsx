import { useEffect, useState } from "react";
import {
  listarPisoApi,
  buscarPisoApi,
} from "../servicios/pisoService";
import type pisoType from "../type/pisoType";

export function usePisos() {
  const [pisos, setPisos] = useState<pisoType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const listarPisos = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await listarPisoApi(page);
      if (response?.status === 200) {
        setPisos(response.data.data);
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

  const buscarPisos = async (nombre: string) => {
    try {
      setLoading(true);
      const response = await buscarPisoApi(nombre);
      if (response?.status === 200) {
        setPisos(response.data.data);
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

  useEffect(() => {
    listarPisos(currentPage);
  }, [currentPage]);

  return {
    pisos,
    currentPage,
    lastPage,
    loading,
    error,
    cambiarPagina,
    listarPisos,
    buscarPisos,
  };
}
