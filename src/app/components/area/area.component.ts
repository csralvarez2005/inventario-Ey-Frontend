import { Component, OnInit } from '@angular/core';
import { AreaService } from '../../services/area.service';
import { Area } from '../../models/area.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  areas: Area[] = [];
  searchId: string = '';
  searchNombre: string = '';
  searchTipo: string = '';

  constructor(private areaService: AreaService) {}

  ngOnInit(): void {
    this.loadAreas();
  }

  /**
   * Carga todas las áreas desde el servicio.
   */
  loadAreas(): void {
    this.areaService.getAreas().subscribe({
      next: (data) => {
        this.areas = data;
      },
      error: (err) => {
        console.error('Error al cargar las áreas:', err.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un problema al cargar las áreas. Por favor, inténtelo más tarde.',
        });
      },
    });
  }

  /**
   * Filtra las áreas según los valores ingresados en los campos de búsqueda.
   */
  filteredAreas(): Area[] {
    return this.areas.filter(
      (area) =>
        (this.searchId === '' || area.areaId?.toString().includes(this.searchId)) &&
        (this.searchNombre === '' || area.nombre.toLowerCase().includes(this.searchNombre.toLowerCase())) &&
        (this.searchTipo === '' || area.tipo.toLowerCase().includes(this.searchTipo.toLowerCase()))
    );
  }

  /**
   * Elimina un área por su ID con confirmación previa.
   * @param id ID del área a eliminar.
   */
  deleteArea(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar esta área después de eliminarla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.areaService.deleteArea(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'El área ha sido eliminada con éxito.', 'success').then(() => {
              this.loadAreas();
            });
          },
          error: (err) => {
            console.error('Error al eliminar el área:', err.message);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el área. Por favor, inténtelo más tarde.',
            });
          },
        });
      }
    });
  }
}