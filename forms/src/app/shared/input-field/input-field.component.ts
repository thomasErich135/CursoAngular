import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const  INPUT_FIELD_VALUE_ACCESSOR:any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true
}

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class InputFieldComponent implements ControlValueAccessor {

  @Input() classCss;
  @Input() id: string;
  @Input() label: string;
  @Input() type = 'text';
  @Input() placeHolder: string;
  @Input() control;
  @Input() isReadOnly: boolean = false;

  private innerValue: any;

  constructor() {    
  }
  
  get value() {
    return this.innerValue;
  }

  set value(v: any){
    if(v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(this.innerValue);
    }
  }

  onChangeCb(_: any): void {
  }

  onTouchedCb(_: any): void {
  }

  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }
}
