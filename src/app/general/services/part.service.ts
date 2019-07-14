import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { PartModel } from '../models/parts/part.model';
import { PagedData } from '../models/paged-data.model';

@Injectable()
export class PartService {

    constructor(private restService: RestService) {

    }

    public getAll(): Promise<PartModel[]> {
        const path = `parts/all`;
        return this.restService.get(path);
    }

    public getAllByJobType(jobTypeId: number): Promise<PartModel[]> {
        const path = `parts/all/${jobTypeId}`;
        return this.restService.get(path);
    }

    public getList(jobTypeId: number, page: number, searchTerm: string = ''): Promise<PagedData<PartModel>> {
        const options = {
            jobTypeId: jobTypeId.toString(),
        };
        return this.restService.getPagedData('parts', page, searchTerm, options);
    }

    public get(id: number): Promise<PartModel> {
        const path = `parts/${id}`;
        return this.restService.get(path);
    }

    public createPart(part: PartModel): Promise<void> {
        return this.restService.post('parts', part);
    }

    public updatePart(part: PartModel): Promise<void> {
        return this.restService.put(`parts/${part.id}`, part);
    }

    public deletePart(id: number): Promise<void> {
        return this.restService.delete(`parts/${id}`);
    }
}
