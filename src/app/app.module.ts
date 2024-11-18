import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AreaComponent } from './components/area/area.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { AreaFormComponent } from './components/area-form/area-form.component';
import { EquipoFormComponent } from './components/equipo-form/equipo-form.component';
import { FuncionarioComponent } from './components/funcionario/funcionario.component';
import { FuncionarioFormComponent } from './components/funcionario-form/funcionario-form.component';
import { AsignacionDeEquipoComponent } from './components/asignacion-de-equipo/asignacion-de-equipo.component';
import { AsignacionDeEquipoFormComponent } from './components/asignacion-de-equipo-form/asignacion-de-equipo-form.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    AreaComponent,
    EquiposComponent,
      AreaFormComponent,
    EquipoFormComponent,
    FuncionarioComponent,
    FuncionarioFormComponent,
    AsignacionDeEquipoComponent,
    AsignacionDeEquipoFormComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
