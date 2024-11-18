import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { AreaComponent } from './components/area/area.component';
import { EquiposComponent } from './components/equipos/equipos.component';

import { AreaFormComponent } from './components/area-form/area-form.component';
import { EquipoFormComponent } from './components/equipo-form/equipo-form.component'; // Asegúrate de tener este componente
import { FuncionarioComponent } from './components/funcionario/funcionario.component';
import { FuncionarioFormComponent } from './components/funcionario-form/funcionario-form.component';
import { AsignacionDeEquipoComponent } from './components/asignacion-de-equipo/asignacion-de-equipo.component';
import { AsignacionDeEquipoFormComponent } from './components/asignacion-de-equipo-form/asignacion-de-equipo-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'areas', component: AreaComponent },
  { path: 'areas/new', component: AreaFormComponent },
  { path: 'areas/edit/:id', component: AreaFormComponent },
  { path: 'equipos', component: EquiposComponent },
  { path: 'equipos/new', component: EquipoFormComponent },
  { path: 'equipos/edit/:id', component: EquipoFormComponent },
  { path: 'funcionarios', component: FuncionarioComponent },
  { path: 'funcionarios/new', component: FuncionarioFormComponent },
  { path: 'funcionarios/edit/:id', component: FuncionarioFormComponent },

  // Rutas para el nuevo componente AsignacionDeEquipo
  { path: 'asignaciones', component: AsignacionDeEquipoComponent },
  { path: 'asignaciones/new', component: AsignacionDeEquipoFormComponent },
  { path: 'asignaciones/edit/:id', component: AsignacionDeEquipoFormComponent }, // Ruta para el formulario de nueva asignación

  { path: '**', redirectTo: '/inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

