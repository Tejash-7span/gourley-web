import { PartModel } from './part.model';

export class JobPartModel {
    id: number;
    jobTypeId: number;
    jobId: number;
    partId = 0;
    quantity = 0;
    part: PartModel;
}
