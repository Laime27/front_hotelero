import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
import type { HabitacionType } from "../type/habitacionType";
 
  export default function HabitacionTable({habitaciones}: {habitaciones: HabitacionType[]}) {
    
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {habitaciones.map((habitacion, index) => (
              <TableRow key={habitacion.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{habitacion.numero}</TableCell>
                <TableCell>{habitacion.descripcion || ""}</TableCell>
                <TableCell>{habitacion.estado}</TableCell>
                <TableCell>S/ {habitacion.precio_hora.toFixed(2)}</TableCell>
                <TableCell>S/ {habitacion.precio_dia.toFixed(2)}</TableCell>
                <TableCell>{habitacion.capacidad}</TableCell>
                <TableCell>{habitacion.categoria.nombre}</TableCell>
                <TableCell>{habitacion.piso.nombre}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </div>
    )
  }
  