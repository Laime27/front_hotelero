import { useState } from "react";

import CalendarioReserva from "@/components/CalendarioReserva/CalendarioReserva";
import type { Reserva as ReservaType } from "@/components/CalendarioReserva/CalendarioReserva";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

// Funciones utilitarias de fechas nativas
function formatFullDate(date: Date): string {
  return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// Evento de ejemplo


// Evento de ejemplo
// Utiliza el tipo importado desde el componente CalendarioReserva
// type Reserva = {
//   id: number;
//   title: string;
//   startDate: Date;
//   endDate: Date;
//   description?: string;
//   color: string;
// };
type Reserva = ReservaType;

const COLORS = [
  "#22d3ee", // cyan
  "#f472b6", // pink
  "#facc15", // yellow
  "#4ade80", // green
  "#818cf8", // indigo
  "#f87171", // red
  "#38bdf8", // sky
  "#fb7185", // rose
];



// Helper local para datos de ejemplo (solo para este archivo)
function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

// Datos de ejemplo para reservas
const exampleReservas: Reserva[] = [
  { id: 1, title: "Check-in Juan", startDate: new Date(), endDate: addDays(new Date(), 1), description: "Habitación 101", color: COLORS[0] },
  { id: 2, title: "Check-out Ana", startDate: addDays(new Date(), 2), endDate: addDays(new Date(), 4), description: "Habitación 202", color: COLORS[1] },
  { id: 3, title: "Reserva Pedro", startDate: addDays(new Date(), 5), endDate: addDays(new Date(), 7), description: "Habitación 303", color: COLORS[2] },
];

export default function Reservas() {
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
  const [showGlobalDialog, setShowGlobalDialog] = useState(false);
  const [reservas, setReservas] = useState<Reserva[]>(exampleReservas);

  // Agregar una nueva reserva con rango y color
  const handleAddRangeReserva = (title: string, description: string, startDate: Date, endDate: Date, color: string) => {
    setReservas([
      ...reservas,
      {
        id: reservas.length + 1,
        title,
        startDate,
        endDate,
        description,
        color,
      },
    ]);
    setShowGlobalDialog(false);
  };

  // Handler para seleccionar día (puedes abrir un diálogo si lo deseas)
  const handleDayClick = (_day: Date) => {
    // Aquí puedes abrir un diálogo de agregar evento si lo necesitas
    // Por ahora solo mostramos un alert
    // alert(`Día seleccionado: ${_day.toLocaleDateString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Reservas</h1>
        <Button onClick={() => setShowGlobalDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> Crear reserva
        </Button>
      </div>
      <CalendarioReserva
        reservas={reservas}
        onDayClick={handleDayClick}
        onReservaClick={setSelectedReserva}
      />

      {/* Dialog global para crear reserva con rango */}
      <Dialog open={showGlobalDialog} onOpenChange={setShowGlobalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Reserva (rango de fechas)</DialogTitle>
          </DialogHeader>
          <AddRangeReservaForm onAdd={handleAddRangeReserva} onCancel={() => setShowGlobalDialog(false)} />
        </DialogContent>
      </Dialog>
      {/* Dialog para ver detalles de reserva */}
      <Dialog open={!!selectedReserva} onOpenChange={() => setSelectedReserva(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedReserva?.title}</DialogTitle>
          </DialogHeader>
          <div>
            <div className="mb-2"><b>Desde:</b> {selectedReserva && formatFullDate(selectedReserva.startDate)}</div>
            <div className="mb-2"><b>Hasta:</b> {selectedReserva && formatFullDate(selectedReserva.endDate)}</div>
            <div className="mb-2"><b>Descripción:</b> {selectedReserva?.description || "-"}</div>
            <div className="mb-2"><b>Color:</b> <span style={{background:selectedReserva?.color, padding:"2px 10px", borderRadius:4}}>{selectedReserva?.color}</span></div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}



// Formulario para agregar reserva con rango de fechas y color
function AddRangeReservaForm({ onAdd, onCancel }: { onAdd: (title: string, description: string, startDate: Date, endDate: Date, color: string) => void, onCancel: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [color, setColor] = useState(COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !start || !end) return;
    // Parsear fechas como local (no UTC) para evitar desfase de días
    const [startYear, startMonth, startDay] = start.split('-').map(Number);
    const startDate = new Date(startYear, startMonth - 1, startDay, 0, 0, 0, 0);
    const [endYear, endMonth, endDay] = end.split('-').map(Number);
    const endDate = new Date(endYear, endMonth - 1, endDay, 0, 0, 0, 0);
    if (startDate > endDate) return;
    onAdd(title, description, startDate, endDate, color);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Título de la reserva"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Descripción (opcional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div className="flex gap-2">
        <div className="flex flex-col flex-1">
          <label className="text-xs mb-1">Desde</label>
          <input type="date" className="border rounded px-3 py-2" value={start} onChange={e => setStart(e.target.value)} required />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-xs mb-1">Hasta</label>
          <input type="date" className="border rounded px-3 py-2" value={end} onChange={e => setEnd(e.target.value)} required />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs mb-1">Color</label>
        <div className="flex gap-2 flex-wrap">
          {COLORS.map(c => (
            <button
              key={c}
              type="button"
              className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-black' : 'border-transparent'}`}
              style={{ background: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Crear</Button>
      </div>
    </form>
  );
}