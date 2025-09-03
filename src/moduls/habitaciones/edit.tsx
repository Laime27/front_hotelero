import HabitacionForm from "./component/habitacionForm";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useHabitaciones } from "./hook/useHabitacion";
import { type HabitacionFormData } from "@/moduls/habitaciones/validations/validations";
import { useHabitacionUpdate } from "./hook/useHabitacionUpdate";
import { useHabitacionEdit } from "./hook/useHabitacionEdit";

export default function EditHabitacion() {
  const { id } = useParams<{ id: string }>();
  const { listarCategorias, listarPisos, categorias, pisos } = useHabitaciones();
  const { actualizarHabitacion, loading, error } = useHabitacionUpdate();
  const { obtenerHabitacion, defaultValues } = useHabitacionEdit();

  useEffect(() => {
    listarCategorias();
    listarPisos();
    if (id) {
      obtenerHabitacion(Number(id));
    }
  }, [id]);

  const handleSubmit = (data: HabitacionFormData) => {
    if (!id) return;
    actualizarHabitacion(Number(id), data);
  };

  return (
    <div className="container-fluid mx-auto p-6 max-w-4xl">
     

      <HabitacionForm
        categorias={categorias}
        pisos={pisos}
        habitacion_id={Number(id)}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        defaultValues={defaultValues}
      />
    </div>
  );
}
