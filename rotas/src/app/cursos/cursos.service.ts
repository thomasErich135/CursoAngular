import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  getCursos() {
    return [
      {id: 1, nome: 'Angular 2', descricao: 'Curso sobre programação Angular 8'},
      {id: 2, nome: 'Java', descricao: 'Curso sobre programação Java'},
      {id: 3, nome: 'C#', descricao: 'Curso sobre programação C#'},
      {id: 4, nome: 'HTML', descricao: 'Curso sobre programação HTML'},
      {id: 5, nome: 'Docker', descricao: 'Curso sobre programação Docker'}
    ]
  }

  getCurso(id: number){
    let curso = this.getCursos().find(curso => curso.id == id); 
    return curso;
  }

  constructor() { }
}
