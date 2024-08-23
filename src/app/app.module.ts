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
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AreaFormComponent } from './components/area-form/area-form.component';
import { EquipoFormComponent } from './components/equipo-form/equipo-form.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    AreaComponent,
    EquiposComponent,
    UsuariosComponent,
    AreaFormComponent,
    EquipoFormComponent,
 
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
