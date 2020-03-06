import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'

import { Curso } from '../shared/interfaces/curso';

import { Observable } from 'rxjs';
import { delay, take, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.API}/cursos`)
      .pipe(
        delay(1000)
      );
  }

  getCursoById(id: number) {
    return this.http.get<Curso>(`${this.API}/cursos/${id}`)
      .pipe(
        take(1)
      );
  }

  private postCurso(curso) {
    return this.http.post(`${this.API}/cursos`, curso)
      .pipe(
        take(1)
      );
  }

  private putCurso(curso) {
    return this.http.put(`${this.API}/cursos/${curso.id}`, curso)
      .pipe(
        take(1)
      );
  }

  save(curso) {
    if(curso.id) {
      return this.putCurso(curso);
    }
    return this.postCurso(curso);
  }

  deleteCurso(id: number) {
    return this.http.delete(`${this.API}/cursos/${id}`)
      .pipe(
        take(1)
      );
  }
}
