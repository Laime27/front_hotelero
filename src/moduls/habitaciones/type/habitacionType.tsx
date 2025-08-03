import type { CategoriaType } from "@/moduls/categorias/type/categoriaType";
import type PisoType from "@/moduls/pisos/type/pisoType";
  
export type HabitacionType = {
    id: number
    numero: string
    descripcion: any
    estado: string
    precio_hora: number
    precio_dia: number
    capacidad: number
    categoria_id: number
    piso_id: number
    deleted_at: any
    created_at: string
    updated_at: string
    categoria: CategoriaType
    piso: PisoType
  }
  
