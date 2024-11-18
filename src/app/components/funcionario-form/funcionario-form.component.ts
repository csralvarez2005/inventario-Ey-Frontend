import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/funcionario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {
  funcionario: Funcionario = {
    funcionarioId: 0,
    identificacion: '',
    nombreFuncionario: '',
    apellidoFuncionario: '',
    celular: '',
    direccion: '',
    email: '',
    estado: '',
    fechaNacimiento: '',
    cargo: '',
    estadoCivil: '',
    genero: '',
    tipoDocumento: ''
  };

  isEditing = false;

  tiposDocumento: string[] = [
    'Cédula de ciudadanía',
    'Tarjeta de identidad',
    'Registro civil',
    'Cédula de extranjería',
    'Pasaporte',
    'Carné diplomático',
    'Documento de identidad extranjero',
    'Permiso especial de permanencia'
  ];

  estadosCiviles: string[] = ['Soltero', 'Casado', 'Divorciado', 'Unión libre', 'Viudo'];
  generos: string[] = ['Masculino', 'Femenino'];
  estados: string[] = ['Activo', 'Inactivo'];

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.funcionarioService.getFuncionarioById(+id).subscribe((data) => {
        this.funcionario = data;
      });
    }
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.funcionarioService.updateFuncionario(this.funcionario.funcionarioId!, this.funcionario).subscribe(
        () => {
          // Mostrar SweetAlert en lugar de un alert
          Swal.fire({
            icon: 'success',
            title: 'Funcionario actualizado',
            text: 'Los datos del funcionario se han actualizado correctamente.',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/funcionarios']);
          });
        },
        (error) => {
          // SweetAlert para error
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: `Ocurrió un error al actualizar el funcionario: ${error.message}`,
            confirmButtonText: 'Cerrar'
          });
        }
      );
    } else {
      this.funcionarioService.createFuncionario(this.funcionario).subscribe(
        () => {
          // SweetAlert para éxito en creación
          Swal.fire({
            icon: 'success',
            title: 'Funcionario creado',
            text: 'El funcionario se ha creado correctamente.',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/funcionarios']);
          });
        },
        (error) => {
          // SweetAlert para error en creación
          Swal.fire({
            icon: 'error',
            title: 'Error al crear',
            text: `Ocurrió un error al crear el funcionario: ${error.message}`,
            confirmButtonText: 'Cerrar'
          });
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/funcionarios']);
  }
}


