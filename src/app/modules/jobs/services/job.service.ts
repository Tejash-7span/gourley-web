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
        const options = {
            jobTypeId: jobTypeId.toString(),
        };
        if (jobFilter.active) {
            options['active'] = `${jobFilter.active}`;
        }
        if (jobFilter.invoiced) {
            options['invoiced'] = `${jobFilter.invoiced}`;
        }
        if (jobFilter.readyToBill) {
            options['readyToBill'] = `${jobFilter.readyToBill}`;
        }
        if (jobFilter.customerName) {
            options['customerName'] = `${jobFilter.customerName}`;
        }
        if (jobFilter.startDate) {
            options['startDate'] = jobFilter.startDate.toISOString();
        }
        if (jobFilter.endDate) {
            options['endDate'] = jobFilter.endDate.toISOString();
        }
        return this.restService.getPagedData(`jobs`, jobFilter.page, jobFilter.searchTerm, options);
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
