import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../../services/equipos.service';
import { Equipo } from '../../models/equipo.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit{  
  equipos: Equipo[] = [];

  constructor(private router: Router, private equiposService: EquiposService) {}

  ngOnInit(): void {
    this.getEquipos();
  }

  getEquipos(): void {
    this.equiposService.getEquipos().subscribe(
      (equipos) => {
        this.equipos = equipos;
      },
      (error) => {
        console.error('Error al obtener los equipos', error);
      }
    );
  }

  onDelete(equipoId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.equiposService.deleteEquipo(equipoId).subscribe(
          () => {
            Swal.fire('Eliminado', 'El equipo ha sido eliminado', 'success');
            this.getEquipos(); // Actualiza la lista después de eliminar
          },
          (error) => {
            console.error('Error al eliminar el equipo', error);
            Swal.fire('Error', 'Hubo un problema al eliminar el equipo', 'error');
          }
        );
      }
    });
  }

}
