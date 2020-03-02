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

  postCurso(Curso) {
    return this.http.post(`${this.API}/cursos`, Curso)
      .pipe(
        take(1)
      );
  }

  getCursoById(id: number) {
    return this.http.get<Curso>(`${this.API}/cursos/${id}`)
      .pipe(
        take(1)
      );
  }
}
