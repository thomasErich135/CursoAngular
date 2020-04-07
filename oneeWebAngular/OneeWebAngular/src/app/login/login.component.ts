import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  anoAtual: number = (new Date()).getFullYear();

  getLogo(): string {
    return './assets/image/icone.png';
  }

  constructor() { }

  ngOnInit() {
  }

}
