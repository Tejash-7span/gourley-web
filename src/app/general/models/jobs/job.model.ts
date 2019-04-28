import { FormGroup } from '@angular/forms';
import { JobPartModel } from '../parts/job-part.model';

export class JobModel {
    id = 0;
    customerName: string = null;
    customerAddress: string = null;
    customerPhone: string = null;
    dateStarted: Date;
    dateFinished: Date;
    active: boolean;
    invoiced: boolean;
    readyToBill: boolean;
    notes: string;
    parts: JobPartModel[];

    public static createInstance(id: number, form: FormGroup) {
        const worker = new JobModel();
        worker.id = id;
        return worker;
    }
}
