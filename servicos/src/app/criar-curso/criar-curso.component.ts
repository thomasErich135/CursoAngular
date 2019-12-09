import { Component, OnInit } from '@angular/core';

import { CursosService } from '../cursos/cursos.service';

@Component({
  selector: 'app-criar-curso',
  templateUrl: './criar-curso.component.html',
  styleUrls: ['./criar-curso.component.css'],
  providers: [CursosService]
})
export class CriarCursoComponent implements OnInit {

  cursos: string[] = [];

  constructor(private CursosService: CursosService) {     
  }

  ngOnInit() {
    this.cursos = this.CursosService.getCursos();
  }

  onAddCursos(newCurso: string){
    this.CursosService.addCursos(newCurso);
  }
}
