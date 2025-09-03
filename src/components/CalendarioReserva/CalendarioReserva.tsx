import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export type Reserva = {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  color: string;
};

interface CalendarioReservaProps {
  reservas: Reserva[];
  onDayClick?: (date: Date) => void;
  onReservaClick?: (reserva: Reserva) => void;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay() === 0 ? 7 : d.getDay();
  d.setDate(d.getDate() - (day - 1));
  d.setHours(0, 0, 0, 0);
  return d;
}
function endOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay() === 0 ? 7 : d.getDay();
  d.setDate(d.getDate() + (7 - day));
  d.setHours(23, 59, 59, 999);
  return d;
}
function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}
function addMonths(date: Date, n: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
}
function subMonths(date: Date, n: number): Date {
  return addMonths(date, -n);
}
function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}
function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function formatMonthYear(date: Date): string {
  return date.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
}
function formatDay(date: Date): number {
  return date.getDate();
}

export default function CalendarioReserva({ reservas, onDayClick, onReservaClick }: CalendarioReservaProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(new Date()));
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  // Renderizar celdas del calendario
  const rows = [];
  let days = [];
  let day = new Date(startDate);
  let formattedDate = 0;

  function isReservaStart(reserva: Reserva, cellDate: Date) {
    return isSameDay(reserva.startDate, cellDate);
  }
  
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = formatDay(day);
      const cloneDay = new Date(day);
      const reservasToShow = reservas.filter(r => isReservaStart(r, cloneDay) && isSameMonth(cloneDay, monthStart));
      days.push(
        <div
          className={`border rounded-md p-2 min-h-[80px] cursor-pointer transition-all flex flex-col gap-1 ${!isSameMonth(day, monthStart) ? "bg-muted text-muted-foreground" : "hover:bg-accent"}`}
          key={day.toISOString()}
          style={{ position: "relative" }}
          onClick={() => onDayClick && onDayClick(cloneDay)}
        >
          {/* Número del día */}
          <div className={`flex items-center justify-between ${isSameDay(day, new Date()) ? "text-primary font-bold" : ""}`}
            style={{ marginBottom: "0.5rem", zIndex: 2, position: "relative" }}>
            <span>{formattedDate}</span>
            <Button variant="ghost" size="icon" className="h-5 w-5 p-0" onClick={e => { e.stopPropagation(); onDayClick && onDayClick(cloneDay); }}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {/* Barras de reservas */}
          <div className="flex flex-col gap-1 mt-4" style={{ position: "relative", zIndex: 1 }}>
            {reservasToShow.map((reserva, idx) => {
              let colSpan = 1;
              let current = new Date(cloneDay);
              while (
                colSpan < 7 - i &&
                addDays(current, 1) <= reserva.endDate &&
                isSameMonth(addDays(current, 1), monthStart)
              ) {
                colSpan++;
                current = addDays(current, 1);
              }
              return (
                <div
                  key={reserva.id}
                  style={{
                    gridColumn: `span ${colSpan} / span ${colSpan}`,
                    background: reserva.color,
                    borderRadius: 6,
                    color: "#18181b",
                    minHeight: 28,
                    zIndex: 10,
                    padding: "0.2rem 0.5rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    width: `calc(${colSpan * 100}% + ${(colSpan - 1) * 0.5}rem)`,
                    marginTop: idx > 0 ? 4 : 0
                  }}
                  onClick={e => { e.stopPropagation(); onReservaClick && onReservaClick(reserva); }}
                >
                  {reserva.title}
                </div>
              );
            })}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7 gap-2 relative" key={day.toISOString()}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl">Calendario</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}><ChevronLeft /></Button>
          <span className="font-semibold text-lg w-32 text-center">{formatMonthYear(currentMonth)}</span>
          <Button variant="outline" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}><ChevronRight /></Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map(day => (
            <div key={day} className="text-center font-semibold text-muted-foreground">{day}</div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {rows}
        </div>
      </CardContent>
    </Card>
  );
}
