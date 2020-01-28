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
 
  constructor() { }

  ngOnInit() {
    
  }

  get errorMessage() {
    for(const propertyName in this.control.errors) {
      if(this.control.errors.hasOwnProperty(propertyName) && this.control.touched){
        // a propriedade hasownproperty verifica se o erro existe no controle informado.
        return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName])
      }
      return null;
    }
  }
}
