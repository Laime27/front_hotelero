import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Paginacion from "@/components/paginacion";
import type { ClienteType } from "../type/clienteType";
import { useState } from "react";
import useToggle from "@/hooks/useToggle";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalCliente from "./modalCliente";

interface Props {
  clientes: ClienteType[];
  currentPage: number;
  lastPage: number;
  cambiarPagina: (nuevaPagina: number) => void;
  loading: boolean;
  error: boolean;
  listarClientes: () => void;
}

export default function TablaCliente({
  clientes,
  currentPage,
  lastPage,
  cambiarPagina,
  loading,
  error,
  listarClientes,
}: Props) {

  const { open, toggle } = useToggle(false);
  const [cliente_id, setCliente_id] = useState<number | null>(null);

  const editarCliente = (id: number) => {
    setCliente_id(id);
    toggle();
  };

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Ocurrió un error al cargar los clientes.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Cargando clientes...
      </div>
    );
  }
  if (clientes.length === 0) {
    return (
      <div className="text-center py-10">No hay clientes disponibles.</div>
    );
  }

  return (
    <>
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">N*</TableHead>
            <TableHead className="text-center">Nombre</TableHead>
            <TableHead className="text-center">N° Documento</TableHead>
            <TableHead className="text-center">Teléfono</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientes.map((cliente, index) => (
            <TableRow key={cliente.id}>
              <TableCell>{index + 1 + (currentPage - 1) * 10}</TableCell>
              <TableCell>{cliente.nombre}</TableCell>
              <TableCell>{cliente.numero_documento}</TableCell>
              <TableCell>{cliente.telefono}</TableCell>
              <TableCell>{cliente.email}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                    onClick={() => editarCliente(cliente.id!)}
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

      <ModalCliente id={cliente_id} open={open} setOpen={toggle} listarClientes={listarClientes} />
    </>
  );
}
