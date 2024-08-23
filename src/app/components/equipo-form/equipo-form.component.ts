import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquiposService } from '../../services/equipos.service';
import { Equipo } from '../../models/equipo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipo-form',
  templateUrl: './equipo-form.component.html',
  styleUrls: ['./equipo-form.component.css']
})
export class EquipoFormComponent implements OnInit {
  equipoForm!: FormGroup;
  isEditMode = false;
  equipoId!: number;

  constructor(
    private fb: FormBuilder,
    private equiposService: EquiposService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.equipoForm = this.fb.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      serie: [''],
      modelo: [''],
      proveedor: [''],
      factura: [''],
      garantia: [''],
      recibidoPor: [''],
      ordenDeCompra: [''],
      ubicacionDelEquipo: [''],
      descripcion: [''],
      componentes: [''],
      accesorios: [''],
      utilizacion: [''],
      tipo: [''],
      fechaDeCompra: [''],
      fechaFinGarantia: [''],
      precio: [0, Validators.required]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.equipoId = +params['id'];
        this.equiposService.getEquipo(this.equipoId).subscribe(equipo => {
          this.equipoForm.patchValue(equipo);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.equipoForm.invalid) {
      return;
    }

    const equipo: Equipo = this.equipoForm.value;

    if (this.isEditMode) {
      this.equiposService.updateEquipo(this.equipoId, equipo).subscribe({
        next: () => {
          Swal.fire({
            title: 'Equipo Actualizado',
            text: 'El equipo ha sido actualizado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/equipos']); 
          });
        },
        error: (err) => this.handleError(err)
      });
    } else {
      this.equiposService.createEquipo(equipo).subscribe({
        next: () => {
          Swal.fire({
            title: 'Equipo Guardado',
            text: 'El equipo ha sido guardado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/equipos']); 
          });
        },
        error: (err) => this.handleError(err)
      });
    }
  }

  private handleError(error: any): void {
    if (error.status === 400 && error.error) {
      Swal.fire({
        title: 'Error',
        text: error.error,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error inesperado. Por favor, intente nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}