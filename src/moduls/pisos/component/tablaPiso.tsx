import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Paginacion from "@/components/paginacion";
import type pisoType from "../type/pisoType";
import { Button } from "@/components/ui/button";
import ModalPiso from "./modalPiso";
import { useState } from "react";
import { Pencil } from "lucide-react";
import useToggle from "@/hooks/useToggle";

export default function TablaPiso({
  pisos,
  currentPage,
  lastPage,
  cambiarPagina,
  loading,
  error,
  listarPisos,
}: {
  pisos: pisoType[];
  currentPage: number;
  lastPage: number;
  cambiarPagina: (nuevaPagina: number) => void;
  loading: boolean;
  error: boolean;
  listarPisos: () => void;
}) {
  const { open, toggle } = useToggle(false);
  const [piso_id, setPiso_id] = useState<number | null>(null);

  const editarPiso = (id: number) => {
    setPiso_id(id);
    toggle();
  };

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Ocurrió un error al cargar los pisos.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Cargando pisos...
      </div>
    );
  }
  if (pisos.length === 0) {
    return (
      <div className="text-center py-10">No hay pisos disponibles.</div>
    );
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
          {pisos.map((piso, index) => (
            <TableRow key={piso.id}>
              <TableCell>{index + 1 + (currentPage - 1) * 10}</TableCell>
              <TableCell>{piso.nombre}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => editarPiso(piso.id)}
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

      <ModalPiso id={piso_id} open={open} setOpen={toggle} listarPisos={listarPisos} />
    </>
  );
}
