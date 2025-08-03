import { crearHabitacionApi } from "../service/habitacionService";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useHabitacionCreate() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const crearHabitacion = async (data: any) => {
        try { 
            setError(null);
            setLoading(true);
            const response = await crearHabitacionApi(data);
            if (response?.status === 201) {
                toast.success("Habitación creada exitosamente");
                navigate("/habitaciones");
              } else {
                toast.error("No se pudo crear la habitación");
              }
        } catch (error: any) {
            const mensaje_error = error.response.data.errors.numero
            console.log("Error al crear habitación:", mensaje_error);
            setError(mensaje_error);
            toast.error("Error al crear la habitación: \n" + mensaje_error);
              
        } finally {
            setLoading(false);
        }
    };

    return {
        crearHabitacion,
        loading,
        error
    };
}

