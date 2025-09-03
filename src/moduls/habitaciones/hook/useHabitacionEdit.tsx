import { ObtenerHabitacionApi } from "../service/habitacionService";
import type { HabitacionType } from "../type/habitacionType";
import { useState } from "react";

export const useHabitacionEdit = () => {
const [habitacion, setHabitacion] = useState<HabitacionType>();
const obtenerHabitacion = async (id: number) => {
    try {
      const response = await ObtenerHabitacionApi(id);
      console.log(response);
      if (response?.status === 200) {
        setHabitacion(response.data);
      }
    } catch (error) {
      console.error("Error al obtener habitación:", error);
    }
  };
  
  const defaultValues = habitacion ? {
    numero: habitacion.numero,
    capacidad: String(habitacion.capacidad),
    precio_hora: String(habitacion.precio_hora),
    precio_dia: String(habitacion.precio_dia),
    categoria_id: String(habitacion.categoria_id),
    piso_id: String(habitacion.piso_id),
    estado: habitacion.estado as "disponible" | "ocupada" | "mantenimiento",
    descripcion: habitacion.descripcion ?? "",
  } : undefined;

  return {
    obtenerHabitacion,
    defaultValues,
  };

};