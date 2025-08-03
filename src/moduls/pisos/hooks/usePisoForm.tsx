import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import usePisoCrud from "./usePisoCrud";

const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
});

export type PisoFormData = z.infer<typeof formSchema>;

interface usePisoFormProps {
  id: number | null;
  listarPisos: () => void;
  setOpen: (open: boolean) => void;
}

export default function usePisoForm({id, listarPisos, setOpen}: usePisoFormProps) {
  
  const { obtenerPiso, crearPiso, actualizarPiso, loading } = usePisoCrud();

  const form = useForm<PisoFormData>({
    resolver: zodResolver(formSchema),
  });

  const cargarPiso = async () => {
    if (id !== null) {
      const data = await obtenerPiso(id);
      form.reset({ nombre: data.nombre });
    }
  };

  const guardarPiso = async (data: PisoFormData) => {
    if (id !== null) {
      await actualizarPiso(id, data.nombre);
    } else {
      await crearPiso(data.nombre);
    }
    setOpen(false);
    listarPisos();
    form.reset();
  };

  return {
    form,
    cargarPiso,
    guardarPiso,
    loading,
  };
}
