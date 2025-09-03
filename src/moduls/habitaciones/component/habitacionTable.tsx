import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
import type { HabitacionType } from "../type/habitacionType";
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface habitacionProps {
  habitaciones: HabitacionType[];
  loading: boolean;
  error: boolean;
}

const colorEstado = (estado:string) => {
    switch(estado){
      case "disponible":
        return "bg-green-500 text-white";
      case "ocupado":
        return "bg-red-500 text-white";
      case "mantenimiento":
        return "bg-yellow-500 text-white";
    }
}

export default function HabitacionTable({habitaciones, loading, error}: habitacionProps) {

    if (loading) {
      return <div className="text-center py-10 text-gray-500">Cargando habitaciones...</div>;
    }
    
    if (error) {
      return <div className="text-center py-10 text-red-500">Ocurrió un error al cargar las habitaciones.</div>;
    }
    
    if (habitaciones.length === 0) {
      return <div className="text-center py-10">No hay habitaciones disponibles.</div>;
    }

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Habitaciones</h1>
      
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Número</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Precio por Hora</TableHead>
              <TableHead>Precio por Día</TableHead>
              <TableHead>Capacidad</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Piso</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {habitaciones.map((habitacion, index) => (
              <TableRow key={habitacion.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{habitacion.numero}</TableCell>
                <TableCell>{habitacion.descripcion || ""}</TableCell>
                <TableCell><Badge variant="default" className= {colorEstado(habitacion.estado)}>{habitacion.estado}</Badge></TableCell>
                <TableCell>S/ {habitacion.precio_hora.toFixed(2)}</TableCell>
                <TableCell>S/ {habitacion.precio_dia.toFixed(2)}</TableCell>
                <TableCell>{habitacion.capacidad}</TableCell>
                <TableCell>{habitacion.categoria.nombre}</TableCell>
                <TableCell>{habitacion.piso.nombre}</TableCell>
                <TableCell>
                  <Link to={`/habitaciones/editar/${habitacion.id}`}>
                    <Button  variant="outline">
                      <Pencil />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </div>
    )
  }
  