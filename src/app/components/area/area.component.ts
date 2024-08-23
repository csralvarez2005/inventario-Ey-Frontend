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

  loadAreas(): void {
    this.areaService.getAreas().subscribe(data => {
      this.areas = data;
    });
  }

  // Método para filtrar áreas según los valores de búsqueda
  filteredAreas(): Area[] {
    return this.areas.filter(area => 
      (this.searchId === '' || area.id?.toString().includes(this.searchId)) &&
      (this.searchNombre === '' || area.nombre.toLowerCase().includes(this.searchNombre.toLowerCase())) &&
      (this.searchTipo === '' || area.tipo.toLowerCase().includes(this.searchTipo.toLowerCase()))
    );
  }

  deleteArea(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás recuperar esta área después de eliminarla.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.areaService.deleteArea(id).subscribe({
          next: () => {
            Swal.fire(
              'Eliminado!',
              'El área ha sido eliminada.',
              'success'
            ).then(() => {
              this.loadAreas();
            });
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al eliminar el área.',
            });
          }
        });
      }
    });
  }
}