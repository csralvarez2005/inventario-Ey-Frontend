import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/funcionario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent  implements OnInit {
  funcionarios: Funcionario[] = [];
  
  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFuncionarios();
  }

  /**
   * Obtiene la lista de funcionarios desde el servicio.
   */
  getFuncionarios(): void {
    this.funcionarioService.getFuncionarios().subscribe(
      (data) => {
        this.funcionarios = data;
      },
      (error) => {
        console.error('Error al obtener funcionarios:', error);
      }
    );
  }

  /**
   * Navega al formulario de creación de un nuevo funcionario.
   */
  navigateToCreate(): void {
    this.router.navigate(['/funcionarios/new']);
  }

  /**
   * Navega al formulario de edición para un funcionario existente.
   * @param funcionarioId - ID del funcionario a editar.
   */
  navigateToEdit(funcionarioId: number): void {
    this.router.navigate(['/funcionarios/edit', funcionarioId]);
  }

  /**
   * Elimina un funcionario por su ID y recarga la lista.
   * @param id - ID del funcionario a eliminar.
   */
  deleteFuncionario(id: number): void {
    // Usar SweetAlert2 para confirmar la eliminación
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar al servicio para eliminar el funcionario
        this.funcionarioService.deleteFuncionario(id).subscribe(
          () => {
            // Mostrar mensaje de éxito
            Swal.fire({
              icon: 'success',
              title: 'Funcionario eliminado',
              text: 'El funcionario ha sido eliminado correctamente.',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.getFuncionarios(); // Recargar la lista después de eliminar
            });
          },
          (error) => {
            // Mostrar mensaje de error
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: `Ocurrió un error al eliminar el funcionario: ${error.message}`,
              confirmButtonText: 'Cerrar'
            });
          }
        );
      }
    });
  }
}

