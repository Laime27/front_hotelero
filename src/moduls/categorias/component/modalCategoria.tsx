import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { editarCategoria } from "../servicios/categoriaService";

export default function ModalCategoria({ id }: { id: number | null }) {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (id !== null) {
      obtenerCategoria(id);
    }
  }, [id]);

  const obtenerCategoria = async (id: number) => {
    try {
      console.log(id);
      const response = await editarCategoria(id);
      setNombre(response.data.nombre);
    } catch (error) {
      console.error("Error al obtener categoría:", error);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="mb-2">
          {id ? "Editar categoría" : "Crear categoría"}{" "}
          <span className="text-red-500">*</span>
        </DialogTitle>
        <DialogDescription>
          <Input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de categoría"
          />
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Cerrar
          </Button>
        </DialogClose>

        {id ? (
          <Button type="button">Actualizar</Button>
        ) : (
          <Button type="button">Crear</Button>
        )}
      </DialogFooter>
    </DialogContent>
  );
}
