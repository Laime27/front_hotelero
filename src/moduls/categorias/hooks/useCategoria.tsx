import { useEffect, useState } from "react";
import {
  listarCategoriaApi,
  buscarCategoriaApi,
} from "../service/categoriaService";
import type { CategoriaType } from "../type/categoriaType";

export function useCategorias() {
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const listarCategorias = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await listarCategoriaApi(page);
      if (response?.status === 200) {
        setCategorias(response.data.data);
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

  const buscarCategorias = async (nombre: string) => {
    try {
      setLoading(true);
      const response = await buscarCategoriaApi(nombre);
      if (response?.status === 200) {
        setCategorias(response.data.data);
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
    listarCategorias(currentPage);
  }, [currentPage]);

  return {
    categorias,
    currentPage,
    lastPage,
    loading,
    error,
    cambiarPagina,
    listarCategorias,
    buscarCategorias,
  };
}
