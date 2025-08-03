import { usePisos } from "./hooks/usePisos";
import TablaPiso from "./component/tablaPiso";
import { Card, CardHeader } from "@/components/ui/card";
import ModalPiso from "./component/modalPiso";
import { Search , Plus} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useToggle from "@/hooks/useToggle";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";

export default function Pisos() {
  const {
    pisos,
    currentPage,
    lastPage,
    loading,
    error,
    cambiarPagina,
    listarPisos,
    buscarPisos,
  } = usePisos();

  const { open, toggle } = useToggle(false);

  const [debouncedSearch, setDebouncedSearch] = useDebounce("", 1000);

  useEffect(() => {
    buscarPisos(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex md:flex-row flex-col w-full items-center justify-between">
            <div className="relative md:w-[40%] w-full mb-4 md:mb-0">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar piso..."
                className="pl-10"
                onChange={(e) => setDebouncedSearch(e.target.value)}
              />
            </div>

            <Button onClick={toggle}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar piso
            </Button>
            <ModalPiso
              id={null}
              open={open}
              setOpen={toggle}
              listarPisos={listarPisos}
            />
          </div>
        </CardHeader>

        <TablaPiso
          pisos={pisos}
          currentPage={currentPage}
          lastPage={lastPage}
          cambiarPagina={cambiarPagina}
          loading={loading}
          error={error}
          listarPisos={listarPisos}
        />
      </Card>
    </div>
  );
}
