import { Pipe, PipeTransform } from '@angular/core';
import { LocalStorageService } from '../../../general/services/localstorage.service';
import { JobType } from '../../../general/models/jobtype/job-type.model';

@Pipe({ name: 'jobTypeName' })
export class JobTypeNamePipe implements PipeTransform {
    jobTypes: JobType[];

    constructor(private localStorageService: LocalStorageService) {
        this.jobTypes = this.localStorageService.jobTypes.filter(type => type.jobEnabled);
    }

    transform(value: number): string {

        const jobType = this.jobTypes.find(type => type.id === value);
        if (jobType) {
            return jobType.name;
        } else {
            return '';
        }
    }
}
