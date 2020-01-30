import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {

  @Input() classCss;
  @Input() id: string;
  @Input() label: string;
  @Input() type = 'text';
  @Input() placeHolder: string;
  @Input() control;

  constructor() { }

  ngOnInit() {
  }

}
