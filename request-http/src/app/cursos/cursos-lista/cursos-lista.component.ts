import { Component, OnInit } from '@angular/core';

import { CursosService } from '../cursos.service';

import { Curso } from 'src/app/shared/interfaces/curso';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styles: [],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //Notação filandesa, $ identificado que a variavel é um Observable
  cursos$: Observable<Curso[]>;

  constructor(private cursosService: CursosService) {}

  ngOnInit() {
    this.cursos$ = this.cursosService.getCursos();
  }

}
