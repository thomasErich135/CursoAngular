import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'

import { Curso } from '../shared/interfaces/curso';

import { Observable } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { CrudService } from '../shared/crud-service';

@Injectable({
  providedIn: 'root'
})
export class CursosService extends CrudService<Curso> {
  
  constructor(protected http: HttpClient) {
    super(http, `${environment.API}/cursos`);
  }
}