import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCategoriaCrud from "./useCategoriaCrud";

const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
});

export type CategoriaFormData = z.infer<typeof formSchema>;

interface useCategoriaFormProps {
  id: number | null;
  listarCategorias: () => void;
  setOpen: (open: boolean) => void;
}

export default function useCategoriaForm({id, listarCategorias, setOpen}: useCategoriaFormProps) {
  
  const { obtenerCategoria, crearCategoria, actualizarCategoria, loading } = useCategoriaCrud();

  const form = useForm<CategoriaFormData>({
    resolver: zodResolver(formSchema),
  });

  const cargarCategoria = async () => {
    if (id !== null) {
      const data = await obtenerCategoria(id);
      form.reset({ nombre: data.nombre });
    }
  };

  const guardarCategoria = async (data: CategoriaFormData) => {
    if (id !== null) {
      await actualizarCategoria(id, data.nombre);
    } else {
      await crearCategoria(data.nombre);
    }
    setOpen(false);
    listarCategorias();
    form.reset();
  };

  return {
    form,
    cargarCategoria,
    guardarCategoria,
    loading,
  };
}
