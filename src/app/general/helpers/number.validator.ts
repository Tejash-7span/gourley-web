import { AbstractControl } from '@angular/forms';

export function priceValidator(control: AbstractControl): { [key: string]: any } | null {

    const valid = /^\d{1,8}(?:[.]\d{1,2})?$/.test(control.value);
    console.log(valid);
    return valid ? null : { invalidprice: { valid: false, value: control.value } };
}

