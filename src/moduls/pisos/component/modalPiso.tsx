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
import usePisoForm from "../hooks/usePisoForm";

interface modalPisoProps {
  id: number | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  listarPisos: () => void;
}

export default function ModalPiso({
  id,
  open,
  setOpen,
  listarPisos,
}: modalPisoProps) {

  const {
    form: {
      handleSubmit,
      register,
      formState: { errors },
      reset,
    },
    cargarPiso,
    guardarPiso,
    loading,
  } = usePisoForm({ id, listarPisos, setOpen });

  useEffect(() => {
    if (id !== null) {
      cargarPiso();
    }
  }, [id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onPointerDownOutside={(e) => { e.preventDefault();  }} onCloseAutoFocus={() => reset()} >
      
           <form onSubmit={handleSubmit(guardarPiso)}>
          <DialogHeader>
            <DialogTitle className="mb-4">
              {id ? "Editar piso" : "Crear piso"}
              <span className="text-red-500">*</span>
            </DialogTitle>
            <Input {...register("nombre")} placeholder="Nombre de piso" />
              {errors.nombre && (
                <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
              )}
          </DialogHeader>

          <DialogFooter className="sm:justify-start mt-6">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cerrar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {id ? "Actualizar" : "Crear"} {loading && "..."}
            </Button>
          </DialogFooter>
           </form>
        </DialogContent>
    </Dialog>
  );
}
