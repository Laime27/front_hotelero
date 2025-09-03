import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import HabitacionTable from "./component/habitacionTable";
import { useHabitacionList } from "./hook/useHabitacionList";
import { useEffect, useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHabitaciones } from "./hook/useHabitacion";

export default function Habitaciones() {
  const { listarHabitaciones, habitaciones, buscarHabitaciones, currentPage, filtrosHabitaciones, loading, error } = useHabitacionList();
  const { listarCategorias, listarPisos, categorias, pisos } = useHabitaciones();
  const [debouncedSearch, setDebouncedSearch] = useDebounce("", 1000);

  const [estado, setEstado] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [pisoId, setPisoId] = useState("");

  useEffect(() => {
    listarCategorias();
    listarPisos();
  }, []);

  useEffect(() => {
    buscarHabitaciones(debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    listarHabitaciones();
  }, [currentPage]);

  useEffect(() => {
    filtrosHabitaciones({
      estado: estado || undefined,
      categoria_id: categoriaId || undefined,
      piso_id: pisoId || undefined,
      page: currentPage
    });
  }, [estado, categoriaId, pisoId, currentPage]);

  return (
    <div className="p-2 sm:p-4">
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            
            {/* Buscador */}
            <div className="relative w-full lg:w-1/3">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Buscar número habitación..."
                className="pl-8"
                onChange={(e) => setDebouncedSearch(e.target.value)}
              />
            </div>

            {/* Filtros */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-row lg:items-center lg:gap-4 w-full lg:w-auto">
              <Select value={categoriaId} onValueChange={setCategoriaId}>
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria.id} value={categoria.id.toString()}>
                      {categoria.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={pisoId} onValueChange={setPisoId}>
                <SelectTrigger className="w-full lg:w-32">
                  <SelectValue placeholder="Piso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  {pisos.map((piso) => (
                    <SelectItem key={piso.id} value={piso.id.toString()}>
                      {piso.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={estado} onValueChange={setEstado}>
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="disponible">Disponible</SelectItem>
                  <SelectItem value="ocupado">Ocupado</SelectItem>
                  <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Botón crear */}
            <div className="w-full lg:w-auto">
              <Link to="/habitaciones/crear" className="block w-full">
                <Button size="sm" className="w-full lg:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Crear habitación
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <HabitacionTable habitaciones={habitaciones} loading={loading} error={error} />
        </div>
      </Card>
    </div>
  );
}
