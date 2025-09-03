import HabitacionForm from "./component/habitacionForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useHabitaciones } from "./hook/useHabitacion";
import { useEffect } from "react";
import { useHabitacionCreate } from "./hook/useHabitacionCreate";
import { type HabitacionFormData } from "@/moduls/habitaciones/validations/validations";

export default function CreateHabitacion() {
  const { listarCategorias, listarPisos, categorias, pisos } = useHabitaciones();
  const { crearHabitacion, loading, error } = useHabitacionCreate();
  
  useEffect(() => {
    listarCategorias();
    listarPisos();
  }, []);
   
  const handleSubmit = (data: HabitacionFormData) => {
    crearHabitacion(data);
  };

  return (
    <div className="container-fluid mx-auto px-6 max-w-4xl" >
     

      <HabitacionForm 
        categorias={categorias}
        pisos={pisos}
        habitacion_id={null}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        defaultValues={undefined}
        
      />

        
    </div>
  );
}
