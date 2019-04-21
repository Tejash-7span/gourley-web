import { FormGroup } from '@angular/forms';

export class WorkerModel {
    id = 0;
    name = '';

    public static createInstance(id: number, form: FormGroup) {
        const worker = new WorkerModel();
        worker.id = id;
        worker.name = form.value['name'];
        return worker;
    }
}
