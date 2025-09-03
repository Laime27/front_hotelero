import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, type LoginFormData } from "./validations/validations";
import { useAutenticacion } from "./hooks/useAutenticacion";

export default function Login() {
  const { autenticacion, loading } = useAutenticacion();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: LoginFormData) => {
    autenticacion(data.email, data.password);
  };

  return (
    <div className="min-h-screen grid place-items-center bg-muted/20 px-4">
      <div className="w-full max-w-md">
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl">Inicia sesión</CardTitle>
            <p className="text-sm text-muted-foreground">
              Ingresa tu correo y contraseña para continuar
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label htmlFor="email" className="required-label">
                  Correo
                </Label>
                <Input type="text" {...register("email")} value={"admin@gmail.com"}/>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="required-label">
                  Contraseña
                </Label>
                <Input type="password" {...register("password")}  value={"123456789"}/>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full rounded-2xl" disabled={loading}>
                Ingresar {loading && "..."}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
