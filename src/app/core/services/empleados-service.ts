
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  // Configuramos la URL base
  private base  = 'http://127.0.0.1:8000/api/empleados'

  // Iniciamos el contructor
  
  // Iniciamos con el Constructor
  constructor (private http:HttpClient)
  {

  }
  
  // Recuperamos la lista de empleado
  listarEmpleados():Observable<any[]>
  {
    // console.log (this.http.get<any[]>(this.base));
    return this.http.get<any[]>(this.base);
  }

  // Creación: Envía 'any' y recibe 'any'
  crearEmpleado(producto: any): Observable<any>{
    return this.http.post<any>(this.base, producto);
  }

}
