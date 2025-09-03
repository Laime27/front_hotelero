import { loginApi } from "../service/authService";
import { toast } from "sonner";
import { useState } from "react";

export function useAutenticacion() {
  const [loading, setLoading] = useState(false);

  const autenticacion = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await loginApi(email, password);

      if (response.status === 200) {
        toast.success("Inicio de sesión exitoso");
      
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  return {
    autenticacion,
    loading,
  };
}
