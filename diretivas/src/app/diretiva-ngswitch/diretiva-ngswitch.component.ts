import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngswitch',
  templateUrl: './diretiva-ngswitch.component.html',
  styleUrls: ['./diretiva-ngswitch.component.css']
})
export class DiretivaNgswitchComponent implements OnInit {

  aba: string = 'home';

  onClickNavBar(abaClick: string){
    this.aba = abaClick;
  }

  constructor() { }

  ngOnInit() {
  }

}
