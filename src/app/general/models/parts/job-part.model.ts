import { PartModel } from './part.model';

export class JobPartModel {
    id: number;
    jobTypeId: number;
    jobId: number;
    partId = 0;
    quantity = 0;
    part: PartModel;

    public static createInstance(partId: number, quantity: number) {
        const jobPart = new JobPartModel();
        jobPart.id = 0;
        jobPart.jobId = 0;
        jobPart.jobTypeId = 0;
        jobPart.partId = partId;
        jobPart.quantity = quantity;
        return jobPart;
    }
}
