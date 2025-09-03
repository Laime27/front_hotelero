
import Dashboard from "@/layouts/dashboard";
import Categorias from "@/moduls/categorias/index";
import Pisos from "@/moduls/pisos/index";
import Habitaciones from "@/moduls/habitaciones/index";
import CreateHabitacion from "@/moduls/habitaciones/create";
import EditHabitacion from "@/moduls/habitaciones/edit";
import Reservas from "@/moduls/reserva/index";
import Clientes from "@/moduls/clientes/index";
import Login from "@/moduls/autenticacion/login";

export const routes = [ 
    {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            path: "categorias",
            element: <Categorias />,
          },
          {
            path: "pisos",
            element: <Pisos />,
          },
          {
            path: "habitaciones",
            element: <Habitaciones />,
          },
          {
            path: "habitaciones/crear",
            element: <CreateHabitacion />,
          },
          {
            path: "habitaciones/editar/:id",
            element: <EditHabitacion />,
          },
          {
            path: "reservas",
            element: <Reservas />,
          },
          {
            path: "clientes",
            element: <Clientes />,
          },
        ],
      },

      {
        path: "/login",
        element: <Login />,
      },
      
    
];
