import { FormGroup } from '@angular/forms';

export class WorkerModel {
    id = 0;
    name = '';
    jobTypeId = 0;

    public static createInstance(id: number, jobTypeId: number, form: FormGroup) {
        const worker = new WorkerModel();
        worker.id = id;
        worker.jobTypeId = jobTypeId;
        worker.name = form.value['name'];
        return worker;
    }
}
