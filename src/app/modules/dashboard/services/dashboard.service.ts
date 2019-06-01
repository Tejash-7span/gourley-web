import { Injectable } from '@angular/core';
import { RestService } from '../../../general/services/rest.service';
import { JobCalendar } from '../../../general/models/jobs/job-calendar.model';

@Injectable()
export class DashboardService {

    constructor(private restService: RestService) {

    }

    public getCalendar(startDate: Date, endDate: Date): Promise<JobCalendar[]> {
        const path = `jobs/dashboard/calendar?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
        return this.restService.get<JobCalendar[]>(path);
    }
}
