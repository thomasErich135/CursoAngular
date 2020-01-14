import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';

import { Observable } from 'rxjs';

import { AlunoFormComponent } from '../aluno-form/aluno-form.component';
import { iFormCanDeactivate } from './iform-candeactivate';

@Injectable({
  providedIn: 'root'
})
export class AlunosDeactivateGuard implements CanDeactivate<iFormCanDeactivate>{

  constructor() {}

  canDeactivate(
    component: iFormCanDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot    
  ) : Observable<boolean> | boolean{

    return component.podeDesativarRota();
  }
}
