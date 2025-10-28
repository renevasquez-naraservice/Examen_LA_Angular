import { Component, inject } from '@angular/core';
import { EmpleadosService } from '../core/services/empleados-service';
import { CommonModule } from '@angular/common';

// -----------------------
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';



@Component({
   selector: 'app-empleados',
  // Se debe incluir ReactiveFormsModule para que los formularios funcionen
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './empleados.html',
  styleUrl: './empleados.scss',
})
export class Empleados {

  empleados_registrados : any []=[];

  constructor(private empleadosService: EmpleadosService) 
  {
    this.inicializarFormulario();
    this.listarEmpleado();  
  }

  // -------------------------------------------------------
  // Propiedades del formulario
  empleadoForm!: FormGroup;
  nombre!: FormControl; 
  apellido!: FormControl; 
  correo!: FormControl; 
  salario!: FormControl;
  
  // Lista local para manejar la creación (Aunque usaremos 'empleados_registrados' para actualizar la UI)
  // lista_empleados_creados: any[] = []; // Si solo se usa empleados_registrados, se puede eliminar esta.


  inicializarFormulario(): void {
    this.nombre = new FormControl('');
    this.apellido = new FormControl('');
    this.correo = new FormControl('');
    this.salario = new FormControl(0); // Usar 0 para inicializar el salario

    // Creamos el FormGroup con controles
    this.empleadoForm = new FormGroup({
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      salario: this.salario
    });
  }


  // ---------------------------------------------------------------------------------
  listarEmpleado():void
  {
    this.empleadosService.listarEmpleados().subscribe({
      next:(data)=> {
        this.empleados_registrados = data
        console.log(this.empleados_registrados);
      },
      error:(err)=>console.error('Error al cargar productos',err)
    })
  }
  // ---------------------------------------------------------------------------------

  // Función para guardar un nuevo empleado (sin validación inicial del formulario)
  guardarEmpleado(): void {
 
    // Convertimos los valores del formulario al tipo esperado (any)
    const nuevoEmpleado: any = this.empleadoForm.value;

    // Utilizamos el servicio inyectado para crear el empleado
    this.empleadosService.crearEmpleado(nuevoEmpleado).subscribe({
        next: (empleadoCreado: any) => {
            console.log('Empleado registrado exitosamente:', empleadoCreado);

          // Agrega el nuevo empleado a la lista local para actualizar la tabla (this.empleados_registrados)
            this.empleados_registrados.push(empleadoCreado); 

          // Limpia el formulario y lo restablece a los valores por defecto
            this.empleadoForm.reset({
                // Se restablece a los valores iniciales
                nombre: '',
                apellido: '',
                correo: '',
                salario: 0 
              });
          // Opcional: Esto asegura que el formulario no se vea 'sucio' después del reset
              this.empleadoForm.markAsPristine();
      },
      error: (err) => {
              console.error('Error al registrar el empleado:', err);
              // Aquí podrías mostrar un mensaje de error en la UI
              if (err.status === 422 && err.error.errors.correo) {
                console.error('Error de validación: El correo ya existe.');
               }
            }
      });
    }

}