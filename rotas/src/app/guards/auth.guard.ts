
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './../home/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad{

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) : Observable<boolean> | boolean {

    console.log('authGuard')

    return this.verificarAcesso()
  }

  private verificarAcesso() {
    if(this.authService.usuarioAutenticado()) {
      return true;
    }
    else {
      this.router.navigate(['/'])
      return false;
    } 
  }
  
  canLoad(
    route: Route
  ) : Observable<boolean> | boolean {

    console.log('canLoad: verificando se o usuario pode carregar o modulo')

    return this.verificarAcesso()
  }
}
