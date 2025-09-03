import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import useClienteForm from "../hooks/useClienteForm";
import { Label } from "@/components/ui/label";

interface ModalClienteProps {
  id: number | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  listarClientes: () => void;
}

export default function ModalCliente({
  id,
  open,
  setOpen,
  listarClientes,
}: ModalClienteProps) {
  const {
    form: {
      handleSubmit,
      register,
      formState: { errors },
      reset,
    },
    cargarCliente,
    guardarCliente,
    loading,
  } = useClienteForm({ id, listarClientes, setOpen });

  useEffect(() => {
    cargarCliente();
  }, [id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onCloseAutoFocus={() => reset()}
      >
        <form onSubmit={handleSubmit(guardarCliente)}>
          <DialogHeader>
            <DialogTitle className="mb-4">
              {id ? "Editar Cliente" : "Nuevo Cliente"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <div>
              <Label className="required-label">Nombre </Label>
              <Input {...register("nombre")} />
              {errors.nombre && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.nombre.message}
                </p>
              )}
            </div>

            <div>
              <Label className="">Teléfono</Label>
              <Input  {...register("telefono")} />
              {errors.telefono && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.telefono.message}
                </p>
              )}
            </div>

            <div> 
              <Label className="">Email</Label>
              <Input  {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label className="">N° Documento</Label>
              <Input
                {...register("numero_documento")}
              />
              {errors.numero_documento && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.numero_documento.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="sm:justify-start mt-6">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button disabled={loading} type="submit">
              {id ? "Actualizar" : "Crear"} {loading && "..."}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
