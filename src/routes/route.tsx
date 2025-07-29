
import Dashboard from "@/layouts/dashboard";
import Categorias from "@/moduls/categorias/index";

export const routes = [ 
    {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            path: "categorias",
            element: <Categorias />,
          },
        
         
        ],
      },
   
    
];
