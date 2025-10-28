import { Routes } from '@angular/router';
import { Empleados } from './empleados/empleados';
export const routes: Routes = [
  { 
    path: '',
    component: Empleados, 
    children: [
      
      { 
        path: '',
        loadComponent: () => import('./empleados/empleados').then(c => c.Empleados)
      }
    //   ,
      
    //   { // 1.2 Ruta Hija: Módulo de Productos (URL: /productos)
    //     path: 'productos', 
    //     // Carga el componente principal de gestión de productos (usado como router-outlet para sub-rutas)
    //     loadComponent: () => import('./productos/productos').then(m => m.Productos)
    //   },
    //   { // 1.3 Ruta Hija: Módulo de Formulario (URL: /form_2)
    //     path: 'form_2', 
    //     // Carga el componente principal de gestión de productos (usado como router-outlet para sub-rutas)
    //     loadComponent: () => import('./form-2/form-2').then(f => f.Form2)
    //   }
    ]
  }
];