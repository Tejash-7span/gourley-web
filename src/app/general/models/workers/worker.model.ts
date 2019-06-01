import { FormGroup } from '@angular/forms';

export class WorkerModel {
    id = 0;
    name = '';
    active = true;
    jobTypeId = 0;

    public static createInstance(id: number, jobTypeId: number, form: FormGroup) {
        console.log(form.value);
        const worker = new WorkerModel();
        worker.id = id;
        worker.jobTypeId = jobTypeId;
        worker.name = form.value['name'];
        worker.active = form.value['active'];
        return worker;
    }
}
