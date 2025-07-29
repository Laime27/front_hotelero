import { useEffect, useState } from "react";
import { listarCategoria } from "../servicios/categoriaService";
import type categoriaType from "../type";

export function useCategorias() {
  const [categorias, setCategorias] = useState<categoriaType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const listarCategorias = async (page: number) => {
    try {
      setLoading(true);
      const response = await listarCategoria(page);
      if (response?.status === 200) {
        setCategorias(response.data.data);
        setLastPage(response.data.last_page);
        setCurrentPage(response.data.current_page);
        setLoading(false);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina > 0 && nuevaPagina <= lastPage) {
      setCurrentPage(nuevaPagina);
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
  };
}
