import { Component, OnInit } from '@angular/core';
import { Area } from '../../models/area.model';
import { AreaService } from '../../services/area.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css']
})
export class AreaFormComponent implements OnInit{
  area: Area = new Area('', '');
  errorMessage: string = '';

  constructor(
    private areaService: AreaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.areaService.getAreaById(id).subscribe(data => {
        this.area = data;
      });
    }
  }

  onSubmit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      // Actualizar área existente
      this.areaService.updateArea(id, this.area).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Área Actualizada',
            text: 'El área se actualizó correctamente.',
          }).then(() => {
            this.router.navigate(['/areas']);
          });
        },
        error: (err) => {
          if (err.status === 409) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'El área con ese nombre ya existe en la base de datos.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al actualizar el área.',
            });
          }
        }
      });
    } else {
      // Crear nueva área
      this.areaService.createArea(this.area).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Área Creada',
            text: 'El área se creó correctamente.',
          }).then(() => {
            this.router.navigate(['/areas']);
          });
        },
        error: (err) => {
          if (err.status === 409) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'El área con ese nombre ya existe en la base de datos.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al crear el área.',
            });
          }
        }
      });
    }
  }
}
