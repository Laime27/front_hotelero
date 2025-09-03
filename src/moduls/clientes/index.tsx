import useClientes from "./hooks/useClientes";
import TablaCliente from "./component/tablaCliente";
import { Card, CardHeader } from "@/components/ui/card";
import { Search , Plus} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useToggle from "@/hooks/useToggle";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";
import ModalCliente from "./component/modalCliente";

export default function Pisos() {
  const {
    clientes,
    currentPage,
    lastPage,
    loading,
    error,
    cambiarPagina,
    listarClientes,
    buscarClientes,
  } = useClientes();

  const { open, toggle } = useToggle(false);

  const [debouncedSearch, setDebouncedSearch] = useDebounce("", 1000);

  useEffect(() => {
    buscarClientes(debouncedSearch);
  }, [debouncedSearch]);

useEffect(() => {
    listarClientes(currentPage);
  }, [currentPage]);

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex md:flex-row flex-col w-full items-center justify-between">
            <div className="relative md:w-[40%] w-full mb-4 md:mb-0">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar nombre cliente..."
                className="pl-10"
                onChange={(e) => setDebouncedSearch(e.target.value)}
              />
            </div>

            <Button onClick={toggle}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar cliente
            </Button>
            
          </div>
        </CardHeader>

        <TablaCliente
          clientes={clientes}
          currentPage={currentPage}
          lastPage={lastPage}
          cambiarPagina={cambiarPagina}
          loading={loading}
          error={error}
          listarClientes={listarClientes}
        />

        <ModalCliente
          id={null}
          open={open}
          setOpen={toggle}
          listarClientes={listarClientes}
        />

      </Card>
    </div>
  );
}
