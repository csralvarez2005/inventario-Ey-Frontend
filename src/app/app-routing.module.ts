import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { AreaComponent } from './components/area/area.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AreaFormComponent } from './components/area-form/area-form.component';
import { EquipoFormComponent } from './components/equipo-form/equipo-form.component'; // Asegúrate de tener este componente

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'areas', component: AreaComponent },
  { path: 'areas/new', component: AreaFormComponent },
  { path: 'areas/edit/:id', component: AreaFormComponent },
  { path: 'equipos', component: EquiposComponent },
  { path: 'equipos/new', component: EquipoFormComponent }, // Ruta para crear un nuevo equipo
  { path: 'equipos/edit/:id', component: EquipoFormComponent }, // Ruta para editar un equipo existente
  { path: 'usuarios', component: UsuariosComponent },
  { path: '**', redirectTo: '/areas' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

