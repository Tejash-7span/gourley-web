import { Injectable } from '@angular/core';
import { RestService } from '../../../general/services/rest.service';
import { PagedData } from '../../../general/models/paged-data.model';
import { JobModel } from '../../../general/models/jobs/job.model';
import { JobListModel } from '../../../general/models/jobs/job-list-model';
import { JobFilterModel } from '../../../general/models/jobs/job-filter.model';

@Injectable()
export class JobService {

    constructor(private restService: RestService) {

    }

    public getList(jobTypeId: number, jobFilter: JobFilterModel): Promise<PagedData<JobListModel>> {
        return this.restService.getPagedData(`jobs`, jobFilter.page, jobFilter.searchTerm, {
            jobTypeId: jobTypeId.toString(),
            active: jobFilter.active === true ? 'true' : 'false',
            invoiced: jobFilter.invoiced === true ? 'true' : 'false',
            readyToBill: jobFilter.readyToBill === true ? 'true' : 'false',
        });
    }

    public get(jobTypeId: number, id: number): Promise<JobModel> {
        return this.restService.get(`jobs/${id}?jobTypeId=${jobTypeId}`);
    }

    public createJob(job: JobModel): Promise<void> {
        return this.restService.post(`jobs`, job);
    }

    public updateJob(job: JobModel): Promise<void> {
        console.log(job);
        return this.restService.put(`jobs/${job.id}`, job);
    }

    public deleteJob(jobTypeId: number, id: number): Promise<void> {
        return this.restService.delete(`jobs/${id}?jobTypeId=${jobTypeId}`);
    }
}
