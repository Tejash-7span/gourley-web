import { Injectable } from '@angular/core';
import { RestService } from '../../../general/services/rest.service';
import { PagedData } from '../../../general/models/paged-data.model';
import { WorkType } from '../../../general/enums/worktype.enum';
import { WorkerModel } from '../../../general/models/workers/worker.model';

@Injectable()
export class WorkerService {

    constructor(private restService: RestService) {

    }

    public getList(jobTypeId: number, page: number, searchTerm: string = ''): Promise<PagedData<WorkerModel>> {
        return this.restService.getPagedData(`workers`, page, searchTerm, { jobTypeId: jobTypeId.toString() });
    }

    public get(jobTypeId: number, id: number): Promise<WorkerModel> {
        const path = `workers/${id}?jobTypeId=${jobTypeId}`;
        return this.restService.get(path);
    }

    public createWorker(worker: WorkerModel): Promise<void> {
        return this.restService.post(`workers`, worker);
    }

    public updateWorker(worker: WorkerModel): Promise<void> {
        return this.restService.put(`workers/${worker.id}`, worker);
    }

    public deleteWorker(jobTypeId: number, id: number): Promise<void> {
        return this.restService.delete(`workers/${id}?jobTypeId=${jobTypeId}`);
    }
}
