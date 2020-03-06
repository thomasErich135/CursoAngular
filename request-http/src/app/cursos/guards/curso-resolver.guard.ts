import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { CursosService } from '../cursos.service';

import { Curso } from './../../shared/interfaces/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<Curso> {
  id: number;
  curso: string;

  constructor(private cursosService: CursosService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Curso> {
    if (route.params && route.params['id']) {
      return this.cursosService.getCursoById(route.params['id'])
    }

    return of({
      id: null,
      curso: null
    });
  }
}
