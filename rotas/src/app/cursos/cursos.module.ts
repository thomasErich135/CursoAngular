
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CursosRoutingModule } from './cursos-routing.module';

import { CursosService } from './cursos.service';

import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';

@NgModule({
  declarations: [
    CursosComponent,
    CursoDetalheComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CursosRoutingModule
  ],
  providers: [
    CursosService
  ]
})
export class CursosModule { }
