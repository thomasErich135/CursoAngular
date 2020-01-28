import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, tap, delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class VerificaEmailService {

  constructor(private http: HttpClient) { }

  verificarEmail(email: string) {
    return this.http.get('assets/dados/verificarEmail.json')
      .pipe(
        //faz a chamada apos alguns segundos
        delay(2000),
        //poderia fazer tudo dentro de um map, mas o interessando é entender oque cada map faz, o tap é apenas um visualizador
        //tap(console.log),
        map((dados: { emails: any[]}) => dados.emails),
        //tap(console.log),
        map((dados: { email: string}[]) => dados.filter(v => v.email == email)),
        //tap(console.log),
        map((dados: any[]) => dados.length > 0),
        //tap(console.log)
      )
  }
}
