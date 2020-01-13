
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './../home/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) : Observable<boolean> | boolean{

    if(this.authService.usuarioAutenticado()) {
      return true;
    }
    else {
      this.router.navigate(['/home'])
      return false;
    }   
  }
}
