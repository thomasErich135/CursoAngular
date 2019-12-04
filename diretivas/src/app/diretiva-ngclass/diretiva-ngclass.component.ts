import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngclass',
  templateUrl: './diretiva-ngclass.component.html',
  styleUrls: ['./diretiva-ngclass.component.css']
})
export class DiretivaNgclassComponent implements OnInit {

  meuFavorito:boolean = false;

  getIconeActive(): string {
    return './assets/icons/activity.svg';
  }

  getIconeGitHub(): string {
    return './assets/icons/github.svg';
  }

  onClick() {
    this.meuFavorito = !this.meuFavorito;
  }

  constructor() { }

  ngOnInit() {
  }

}
