import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  consoleLog(mensagem: string){
    console.log(mensagem);
  }

  constructor() { }
}
