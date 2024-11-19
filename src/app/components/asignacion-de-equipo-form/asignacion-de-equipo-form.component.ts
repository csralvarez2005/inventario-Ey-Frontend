import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsignacionEquipoService } from '../../services/asignacion-equipo.service';
import { AsignacionEquipo } from 'src/app/models/asignacion-equipo.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignacion-de-equipo-form',
  templateUrl: './asignacion-de-equipo-form.component.html',
  styleUrls: ['./asignacion-de-equipo-form.component.css']
})
export class AsignacionDeEquipoFormComponent implements OnInit { 
  @Input() asignacion: AsignacionEquipo | null = null; // Datos a editar
  @Output() guardar = new EventEmitter<AsignacionEquipo>(); // Evento para guardar cambios
  @Output() cancelar = new EventEmitter<void>(); // Evento para cancelar edición

  asignacionForm!: FormGroup;
  areas: any[] = [];
  equipos: any[] = [];
  funcionarios: any[] = [];
  mensajeError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private asignacionEquipoService: AsignacionEquipoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.asignacionForm = this.fb.group({
      area: ['', Validators.required],
      equipo: ['', Validators.required],
      funcionario: ['', Validators.required],
      fechaAsignacion: ['', [Validators.required]],
    });

    this.loadData();
  }

  loadData(): void {
    this.asignacionEquipoService.getAreas().subscribe(
      (data) => (this.areas = data),
      (error) => this.handleError('Error al cargar áreas', error)
    );

    this.asignacionEquipoService.getEquipos().subscribe(
      (data) => (this.equipos = data),
      (error) => this.handleError('Error al cargar equipos', error)
    );

    this.asignacionEquipoService.getFuncionarios().subscribe(
      (data) => (this.funcionarios = data),
      (error) => this.handleError('Error al cargar funcionarios', error)
    );
  }

  onSubmit(): void {
    if (this.asignacionForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor complete todos los campos requeridos.',
      });
      return;
    }

    const formValue = this.asignacionForm.value;
    const asignacionDTO = {
      areaNombre: formValue.area,
      equipoNombre: formValue.equipo,
      funcionarioNombre: formValue.funcionario,
      fechaAsignacion: formValue.fechaAsignacion,
    };

    this.asignacionEquipoService.createAsignacion(asignacionDTO).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Equipo asignado con éxito.',
        });
        this.asignacionForm.reset();
        this.router.navigate(['/asignaciones']); // Redirección al componente principal
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error al asignar equipo: ${error.message}`,
        });
      },
    });
  }

  cancelarEdicion(): void {
    this.cancelar.emit();
  }

  private handleError(mensaje: string, error: any): void {
    console.error(mensaje, error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `${mensaje}: ${error.message}`,
    });
  }
    }
  


