import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'

import { Curso } from '../shared/interfaces/curso';

import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.API}/cursos`)
      .pipe(
        delay(2000)
      );
  }
}
