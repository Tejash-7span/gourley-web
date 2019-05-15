import { FormGroup } from '@angular/forms';

export function conditionalRequried(controlName: string, conditionalControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const conditionalControl = formGroup.controls[conditionalControlName];
        if (control && conditionalControl) {
            if (conditionalControl.value === true) {
                if (!control.value) {
                    control.setErrors({ conditionalrequired: true });
                } else {
                    control.setErrors(null);
                }
            }
        }
    };
}
