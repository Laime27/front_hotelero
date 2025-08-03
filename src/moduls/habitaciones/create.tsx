import HabitacionForm from "./component/habitacionForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CreateHabitacion() {
  return (
    <div className="container-fluid mx-auto p-6 max-w-4xl" >
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <Link to="/habitaciones">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold">Nueva Habitación</h1>
          <p className="text-muted-foreground text-sm">
            Completa los datos para registrar una habitación
          </p>
        </div>
      </div>

      <HabitacionForm />
    </div>
  );
}
