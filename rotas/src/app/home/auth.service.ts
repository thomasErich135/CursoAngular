import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAuth: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private routed: Router) { }

  fazerLogin(usuario: Usuario){
    if(usuario.usuario === 'usuario@email.com' &&
      usuario.password === '123456') {
        this.usuarioAuth = true;
        this.mostrarMenuEmitter.emit(true);

        this.routed.navigate(['/cursos'])
      }
      else {
        this.usuarioAuth = false;
        this.mostrarMenuEmitter.emit(false);
      }       
  }

  usuarioAutenticado() {
    return this.usuarioAuth;
  }
}
