import { z } from "zod";

export const schema = z.object({
  numero: z.string().nonempty("El número es obligatorio"),
  capacidad: z
    .string()
    .nonempty("La capacidad es obligatoria")
    .refine((val) => parseInt(val) > 0, {
      message: "Debe ser mayor a 0",
    }),
  descripcion: z.string().optional(),
  precio_hora: z.string().nonempty("El precio por hora es obligatorio"),
  precio_dia: z.string().nonempty("El precio por día es obligatorio"),
  categoria_id: z.string().nonempty("La categoría es obligatoria"),
  piso_id: z.string().nonempty("El piso es obligatorio"),
  estado: z.enum(["disponible", "ocupada", "mantenimiento"]),
});




