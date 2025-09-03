import { actualizarHabitacionApi } from "../service/habitacionService";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useHabitacionUpdate() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const actualizarHabitacion = async (id: number, data: any) => {
        try {
            setError(null);
            setLoading(true);
            const response = await actualizarHabitacionApi(id, data);
            if (response?.status === 200) {
                toast.success("Habitación actualizada exitosamente");
                navigate("/habitaciones");
            } else {
                toast.error("No se pudo actualizar la habitación");
            }
        } catch (error: any) {
            const mensaje_error = error.response?.data?.errors?.numero || "Error desconocido";
            console.log("Error al actualizar habitación:", mensaje_error);
            setError(mensaje_error);
            toast.error("Error al actualizar la habitación: \n" + mensaje_error);
        } finally {
            setLoading(false);
        }
    };

    return {
        actualizarHabitacion,
        loading,
        error
    };
}
