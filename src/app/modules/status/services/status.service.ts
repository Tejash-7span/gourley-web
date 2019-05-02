import { Injectable } from '@angular/core';
import { RestService } from '../../../general/services/rest.service';
import { PagedData } from '../../../general/models/paged-data.model';
import { StatusModel } from '../../../general/models/status/status.model';

@Injectable()
export class StatusService {

    constructor(private restService: RestService) {

    }

    public getList(page: number, searchTerm: string = ''): Promise<PagedData<StatusModel>> {
        return this.restService.getPagedData('status', page, searchTerm);
    }

    public get(id: number): Promise<StatusModel> {
        const path = `status/${id}`;
        return this.restService.get(path);
    }

    public createStatus(status: StatusModel): Promise<void> {
        return this.restService.post('status', status);
    }

    public updateStatus(status: StatusModel): Promise<void> {
        return this.restService.put(`status/${status.id}`, status);
    }

    public deleteStatus(id: number): Promise<void> {
        return this.restService.delete(`status/${id}`);
    }
}
