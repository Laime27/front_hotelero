import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useClienteCrud from "./useClienteCrud";

const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),

  telefono: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]+$/.test(val), {
      message: "El teléfono solo debe contener números",
    }),

    email: z
    .string()
    .nullable()
    .optional()
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Formato de email inválido",
    }),
  
   numero_documento: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]+$/.test(val), {
      message: "El número de documento solo debe contener números",
    }),
});

export type ClienteFormData = z.infer<typeof formSchema>;

interface useClienteFormProps {
  id: number | null;
  listarClientes: () => void;
  setOpen: (open: boolean) => void;
}

export default function useClienteForm({id, listarClientes, setOpen}: useClienteFormProps) {
  
  const { obtenerCliente, crearCliente, actualizarCliente, loading } = useClienteCrud();

  const form = useForm<ClienteFormData>({
    resolver: zodResolver(formSchema),
  });

  const cargarCliente = async () => {
    if (id !== null) {
      const data = await obtenerCliente(id);
      form.reset({ nombre: data.nombre, telefono: data.telefono, email: data.email, numero_documento: data.numero_documento });
    }
  };

  const guardarCliente = async (data: ClienteFormData) => {
    if (id !== null) {
      await actualizarCliente(id, data);
    } else {
      await crearCliente(data);
    }
    setOpen(false);
    listarClientes();
    form.reset();
  };

  return {
    form,
    cargarCliente,
    guardarCliente,
    loading,
  };
}
