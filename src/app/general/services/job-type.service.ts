import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { LocalStorageService } from './localstorage.service';
import { JobType } from '../models/jobtype/job-type.model';


@Injectable()
export class JobTypeService {

    constructor(private restService: RestService) {
    }

    public getAll(): Promise<JobType[]> {
        return this.restService.get<JobType[]>('jobtypes');
    }
}
