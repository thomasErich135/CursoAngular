import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { VerificaEmailService } from '../data-form/services/verifica-email.service';

import { map } from 'rxjs/operators'

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

    static validarCep(control: FormControl){        
        const cep = control.value;
        if(cep && cep !== '') {
            var validacep = /^[0-9]{8}$|^[0-9]{5}[-]{1}[0-9]{3}$/g; //refatoramos o regex para permitir cep com hifem '-' 09812-600
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

    static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
        const config = {
            'required': `${fieldName} é obrigatório.`,
            'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
            'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
            'cepInvalido': 'CEP inválido.',
            'email': 'Email inválido.',
            'emailExiste': 'Email já cadastrado.',
            'equalsTo': `${fieldName} não é igual.`
        };

        return config[validatorName];
    }
}