import { FormArray } from '@angular/forms';

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
}