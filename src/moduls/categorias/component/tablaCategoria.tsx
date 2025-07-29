import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Paginacion from "@/components/paginacion";
import type categoriaType from "../type";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import ModalCategoria from "./modalCategoria";
import { useState } from "react";
import { Pencil } from "lucide-react";

export default function TablaCategoria({
  categorias,
  currentPage,
  lastPage,
  cambiarPagina,
  loading,
  error,
}: {
  categorias: categoriaType[];
  currentPage: number;
  lastPage: number;
  cambiarPagina: (nuevaPagina: number) => void;
  loading: boolean;
  error: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [categoria_id, setCategoria_id] = useState<number | null>(null);

  const editarCategoria = (id: number) => {
    setCategoria_id(id);
    setOpen(true);
  };

  if (loading) {
    return <div className="text-center py-10">Cargando categorías...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Ocurrió un error al cargar las categorías.</div>;
  }

  if (categorias.length === 0) {
    return <div className="text-center py-10">No hay categorías disponibles.</div>;
  }
  
  return (
    <>
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">N*</TableHead>
            <TableHead className="text-center">Nombre</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categorias.map((categoria, index) => (
            <TableRow key={categoria.id}>
              <TableCell>{index + 1 + (currentPage - 1) * 10}</TableCell>
              <TableCell>{categoria.nombre}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => editarCategoria(categoria.id)}
                >
                  <Pencil />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end my-4">
        <Paginacion
          currentPage={currentPage}
          lastPage={lastPage}
          onPageChange={cambiarPagina}
          range={2}
        />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <ModalCategoria id={categoria_id} />
      </Dialog>
    </>
  );
}
