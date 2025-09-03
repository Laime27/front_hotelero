import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type {CategoriaType} from "@/moduls/categorias/type/categoriaType";
import type pisoType from "@/moduls/pisos/type/pisoType";
import { schema, type HabitacionFormData } from "../validations/validations";
import { useEffect } from "react";

interface HabitacionFormProps {
  categorias: CategoriaType[];
  pisos: pisoType[];
  habitacion_id: number | null;
  onSubmit: (data: HabitacionFormData) => void;
  loading: boolean;
  error: string | null;
  defaultValues: HabitacionFormData | undefined;
}



export default function HabitacionForm({ categorias, pisos, habitacion_id, onSubmit, loading, error, defaultValues }: HabitacionFormProps) {
 
  const initialFormValues: HabitacionFormData = defaultValues ?? {
    categoria_id: "",
    piso_id: "",
    estado: "disponible",
    numero: "",
    capacidad: "1",
    precio_hora: "0",
    precio_dia: "0",
    descripcion: "",
  };
  

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<HabitacionFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialFormValues
  });

  
 
useEffect(() => {
  reset(initialFormValues);
}, [defaultValues, reset]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Información de la Habitación</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="numero" className="required-label">
                Número de Habitación
              </Label>
              <Input className="h-11" {...register("numero")} />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {errors.numero && (
                <p className="text-red-500 text-sm">{errors.numero.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="capacidad" className="required-label">
                Capacidad
              </Label>
              <Input
                type="number"
                min="1"
                className="h-11"
                {...register("capacidad")}
              />
              {errors.capacidad && (
                <p className="text-red-500 text-sm">
                  {errors.capacidad.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea rows={4} {...register("descripcion")} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="required-label">Categoría</Label>
              <div className="flex gap-2">
                <Controller
                  name="categoria_id"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full h-11">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias && categorias.length > 0 ? (
                          categorias.map((categoria) => (
                            <SelectItem
                              key={categoria.id}
                              value={categoria.id.toString()}
                            >
                              {categoria.nombre}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem disabled value="none">
                            No hay categorías disponibles
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {/* <Button type="button" variant="outline" size="icon">
                  <Plus className="w-4 h-4" />
                </Button> */}
              </div>
              {errors.categoria_id && (
                <p className="text-red-500 text-sm">
                  {errors.categoria_id.message}
                </p>
              )}
            </div>

            <div>
              <Label className="required-label">Piso</Label>
              <div className="flex gap-2">
                <Controller
                  name="piso_id"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full h-11">
                        <SelectValue placeholder="Selecciona un piso" />
                      </SelectTrigger>
                        <SelectContent>
                        {pisos && pisos.length > 0 ? (
                          pisos.map((piso) => (
                            <SelectItem key={piso.id} value={piso.id.toString()}>
                              {piso.nombre}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem disabled value="none">
                            No hay pisos disponibles
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {/* <Button type="button" variant="outline" size="icon">
                  <Plus className="w-4 h-4" />
                </Button> */}
              </div>
              {errors.piso_id && (
                <p className="text-red-500 text-sm">{errors.piso_id.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="required-label">Precio por Hora</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                className="h-11"
                {...register("precio_hora")}
              />
              {errors.precio_hora && (
                <p className="text-red-500 text-sm">
                  {errors.precio_hora.message}
                </p>
              )}
            </div>
            <div>
              <Label className="required-label">Precio por Día</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                className="h-11"
                {...register("precio_dia")}
              />
              {errors.precio_dia && (
                <p className="text-red-500 text-sm">
                  {errors.precio_dia.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label className="required-label">Estado</Label>
            <Controller
              name="estado"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full md:w-[200px] h-11">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disponible">Disponible</SelectItem>
                    <SelectItem value="ocupado">Ocupado</SelectItem>
                    <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.estado && (
              <p className="text-red-500 text-sm">{errors.estado.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Link to="/habitaciones">
              <Button type="button" variant="outline" className="h-11 px-6">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" className="h-11 px-6" disabled={loading}>
              {habitacion_id ? "Actualizar Habitación" : "Crear Habitación"} {loading && "..."}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
