
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunosGuard implements CanActivateChild{

  constructor(private router: Router) { }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) : Observable<boolean> | boolean{

    console.log('alunos guard child');

    if(state.url.includes('editar')){
      //alert('Usuário sem acesso.');
      return true;
    }
    else {
      return true;
    }    
  }
}
