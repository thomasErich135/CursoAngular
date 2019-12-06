import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dretiva-customizadas',
  templateUrl: './dretiva-customizadas.component.html',
  styleUrls: ['./dretiva-customizadas.component.css']
})
export class DretivaCustomizadasComponent implements OnInit {

  mostrarCursos: boolean = false;

  onMonstrarCursos() {
    this.mostrarCursos = !this.mostrarCursos;
  }

  constructor() { }

  ngOnInit() {
  }

}
