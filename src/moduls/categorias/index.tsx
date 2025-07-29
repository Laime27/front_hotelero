import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ModalCategoria from "./component/modalCategoria";
import TablaCategoria from "./component/tablaCategoria";
import { useCategorias } from "./hooks/categoriaUse";

export default function Categorias() {
  const { categorias, currentPage, lastPage, loading, error, cambiarPagina } = useCategorias();

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="relative w-[20%]">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar categoría..."
                className="pl-10"
              />
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar categoría
                </Button>
              </DialogTrigger>
              <ModalCategoria id={null} />
            </Dialog>
          </div>
        </CardHeader>

        <TablaCategoria
          categorias={categorias}
          currentPage={currentPage}
          lastPage={lastPage}
          cambiarPagina={cambiarPagina}
          loading={loading}
          error={error}
        />
      </Card>
    </div>
  );
}
