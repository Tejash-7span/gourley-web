import { Injectable } from '@angular/core';
import { RestService } from '../../../general/services/rest.service';
import { PagedData } from '../../../general/models/paged-data.model';
import { WorkType } from '../../../general/enums/worktype.enum';
import { JobModel } from '../../../general/models/jobs/job.model';
import { JobListModel } from '../../../general/models/jobs/job-list-model';
import { JobFilterModel } from '../../../general/models/jobs/job-filter.model';

@Injectable()
export class JobService {

    constructor(private restService: RestService) {

    }

    public getList(type: WorkType, jobFilter: JobFilterModel): Promise<PagedData<JobListModel>> {
        const path = this.getRoute(type);
        return this.restService.getPagedData(path, jobFilter.page, jobFilter.searchTerm, {
            active: jobFilter.active === true ? 'true' : 'false',
            invoiced: jobFilter.invoiced === true ? 'true' : 'false',
            readyToBill: jobFilter.readyToBill === true ? 'true' : 'false',
        });
    }

    public get(type: WorkType, id: number): Promise<JobModel> {
        const path = this.getRoute(type);
        return this.restService.get(`${path}/${id}`);
    }

    public createJob(type: WorkType, Job: JobModel): Promise<void> {
        const path = this.getRoute(type);
        return this.restService.post(path, Job);
    }

    public updateJob(type: WorkType, Job: JobModel): Promise<void> {
        const path = this.getRoute(type);
        return this.restService.put(`${path}/${Job.id}`, Job);
    }

    public deleteJob(type: WorkType, id: number): Promise<void> {
        const path = this.getRoute(type);
        return this.restService.delete(`${path}/${id}`);
    }

    private getRoute(type: WorkType): string {
        switch (type) {
            case WorkType.DryWall:
                return 'drywalljobs';
            case WorkType.Stone:
                return 'stonejobs';
            case WorkType.Stucco:
                return 'stuccojobs';
            default:
                throw new Error('work type not supported');
        }
    }
}
