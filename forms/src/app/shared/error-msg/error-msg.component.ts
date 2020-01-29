import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;
 
  constructor() {     
  }

  ngOnInit() {    
  }

  get errorMessage() {
    for(const propertyName in this.control.errors) {
      if(this.control.errors.hasOwnProperty(propertyName) && (this.control.touched || this.control.dirty)){
        // o metodo hasownproperty verifica se o objeto errors, contem a propriedade com nome especificado
        return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName])
      }
      return null;
    }
  }
}
