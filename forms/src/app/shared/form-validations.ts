import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {
    static requiredMinCheckbox(min = 1) {
        const validator = (formArray: FormArray) => {

            // let totalChecked = 0;
            // const values = formArray.controls;
            // for(let i = 0; i < values.length; i++) {
            //   if(values[i].value){
            //     totalChecked += 1;
            //   }
            // }

            let totalChecked = formArray.controls
                .map(v => v.value)
                .reduce((total, current) => current ? total += 1 : total, 0);

            return totalChecked >= min ? null : { required: true };
        };
        return validator;
    }

    static cepValidator(control: FormControl){        
        const cep = control.value;
        if(cep && cep !== '') {

            var validacep = /^[0-9]{8}$/g;
            return validacep.test(cep) ? null : { cepInvalido: true }
        }
        return null;
    }

    static equalsTo(otherField: string){
        const validator = (formControl: FormControl) => {
                        
            if(!formControl.root || !(<FormGroup>formControl.root).controls) {
                return null;
            }

            if(otherField == null){
                throw new Error('É necessario informar um campo.');
            }

            const field  = (<FormGroup>formControl.root).get(otherField);

            if(!field) {
                throw new Error('É necessario informar um campo.');
            }

            if(field.value !== formControl.value) {
                return { equalsTo: otherField }
            }

            return null;
        }      

        return validator;
    }
}