import { Injectable } from '@angular/core';
import { RestService } from '../../../general/services/rest.service';
import { PagedData } from '../../../general/models/paged-data.model';
import { PartModel } from '../../../general/models/parts/part.model';

@Injectable()
export class PartService {

    constructor(private restService: RestService) {

    }

    public getList(page: number, searchTerm: string = ''): Promise<PagedData<PartModel>> {
        return this.restService.getPagedData('parts', page, searchTerm);
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
