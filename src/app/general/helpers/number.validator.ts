import { AbstractControl } from '@angular/forms';

export function priceValidator(control: AbstractControl): { [key: string]: any } | null {

    const valid = /^\d{1,8}(?:[.]\d{1,2})?$/.test(control.value);
    return valid ? null : { invalidprice: { valid: false, value: control.value } };
}

export function quantityValidator(control: AbstractControl): { [key: string]: any } | null {

    const valid = /^[0-9]+$/.test(control.value);
    return valid ? null : { invalidquantity: { valid: false, value: control.value } };
}

