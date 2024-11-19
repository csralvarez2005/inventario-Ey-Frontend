import { Component, OnInit } from '@angular/core';
import { AsignacionEquipo } from '../../models/asignacion-equipo.model';
import { AsignacionEquipoService } from '../../services/asignacion-equipo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-asignacion-de-equipo',
  templateUrl: './asignacion-de-equipo.component.html',
  styleUrls: ['./asignacion-de-equipo.component.css']
})
export class AsignacionDeEquipoComponent implements OnInit {
  asignaciones: AsignacionEquipo[] = [];
  errorMessage: string = '';
  isEditing: boolean = false; // Indica si se está editando un registro
  asignacionSeleccionada: AsignacionEquipo | null = null; // Registro seleccionado para editar

  constructor(private asignacionEquipoService: AsignacionEquipoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarAsignaciones();
  }

  cargarAsignaciones(): void {
    this.asignacionEquipoService.getAsignaciones().subscribe({
      next: (data) => {
        this.asignaciones = data;
        if (this.asignaciones.length === 0) {
          this.errorMessage = '0 registros de asignaciones registrados';
        } else {
          this.errorMessage = ''; // Limpia el mensaje de error si hay registros
        }
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar las asignaciones.',
        });
        console.error('Error:', error);
      }
    });
  }

  editarAsignacion(asignacion: AsignacionEquipo): void {
    this.isEditing = true; // Cambia a modo edición
    this.asignacionSeleccionada = { ...asignacion }; // Clona los datos del registro seleccionado
  }

  cancelarEdicion(): void {
    this.isEditing = false; // Sal del modo edición
    this.asignacionSeleccionada = null; // Limpia el registro seleccionado
  }

  actualizarAsignacion(asignacionActualizada: AsignacionEquipo): void {
    if (!asignacionActualizada.id) return;

    this.asignacionEquipoService.updateAsignacion(asignacionActualizada.id, asignacionActualizada).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Asignación actualizada con éxito.',
        });
        this.cargarAsignaciones(); // Recarga la lista de asignaciones
        this.cancelarEdicion(); // Sal del modo edición
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al actualizar la asignación.',
        });
        console.error('Error al actualizar:', error);
      }
    });
  }

  eliminarAsignacion(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.asignacionEquipoService.deleteAsignacion(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'Asignación eliminada con éxito.',
            });
            this.cargarAsignaciones();
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al eliminar la asignación.',
            });
            console.error('Error al eliminar:', error);
          }
        });
      }
    });
  }
}
