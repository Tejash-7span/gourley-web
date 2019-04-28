import { Injectable } from '@angular/core';
import { RestService } from '../../../general/services/rest.service';
import { PagedData } from '../../../general/models/paged-data.model';
import { WorkType } from '../../../general/enums/worktype.enum';
import { WorkerModel } from '../../../general/models/workers/worker.model';

@Injectable()
export class WorkerService {

    constructor(private restService: RestService) {

    }

    public getList(type: WorkType, page: number, searchTerm: string = ''): Promise<PagedData<WorkerModel>> {
        return this.restService.getPagedData(`workers/${type}`, page, searchTerm);
    }

    public get(type: WorkType, id: number): Promise<WorkerModel> {
        const path = `workers/${type}/${id}`;
        return this.restService.get(path);
    }

    public createWorker(type: WorkType, worker: WorkerModel): Promise<void> {
        return this.restService.post(`workers/${type}`, worker);
    }

    public updateWorker(type: WorkType, worker: WorkerModel): Promise<void> {
        return this.restService.put(`workers/${type}/${worker.id}`, worker);
    }

    public deleteWorker(type: WorkType, id: number): Promise<void> {
        return this.restService.delete(`workers/${type}/${id}`);
    }
}
