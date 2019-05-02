import { FormGroup } from '@angular/forms';

export class StatusModel {
    id = 0;
    name = '';

    public static createInstance(id: number, form: FormGroup) {
        const part = new StatusModel();
        part.id = id;
        part.name = form.value['name'];
        return part;
    }
}
