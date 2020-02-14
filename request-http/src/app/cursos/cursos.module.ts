import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';

import { CursosService } from './cursos.service';

import { CursosListaComponent } from './cursos-lista/cursos-lista.component';

@NgModule({
  declarations: [
    CursosListaComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule
  ],
  providers: [
    CursosService
  ]
})
export class CursosModule { }
