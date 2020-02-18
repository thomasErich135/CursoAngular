import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CursosRoutingModule } from './cursos-routing.module';

import { CursosService } from './cursos.service';

import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { CursoFormComponent } from './curso-form/curso-form.component';

@NgModule({
  declarations: [
    CursosListaComponent,
    CursoFormComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CursosService
  ]
})
export class CursosModule { }
