import { Component, OnInit } from '@angular/core';
import { AreaService } from '../../services/area.service';
import { Area } from '../../models/area.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  areas: Area[] = []; // Lista de áreas
  errorMessage: string | null = null; // Mensaje de error (si ocurre)

  constructor(private areaService: AreaService) {}

  ngOnInit(): void {
    this.getAreas(); // Cargar las áreas al iniciar el componente
  }

  // Método para obtener las áreas
  getAreas(): void {
    this.areaService.getAreas().subscribe({
      next: (data) => {
        this.areas = data; // Asignar áreas recibidas
        this.errorMessage = null; // Limpiar mensajes de error
      },
      error: (err) => {
        this.errorMessage = err.message; // Mostrar mensaje de error
        console.error('Error al obtener áreas:', err);
      }
    });
  }

}
