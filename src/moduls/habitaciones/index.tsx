
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import HabitacionTable from "./component/habitacionTable";
import { useHabitacionList } from "./hook/useHabitacionList";
import { useEffect } from "react";
export default function Habitaciones() {
    const { listarHabitaciones, habitaciones } = useHabitacionList();
    useEffect(() => {
        listarHabitaciones();
    }, []);
    return (
        <div >
           <Link to="/habitaciones/crear">
                <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Habitación
                </Button>
            </Link>
           

            <HabitacionTable habitaciones={habitaciones} />

        </div>
    );
}