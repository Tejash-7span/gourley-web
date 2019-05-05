import { Component, OnInit, ViewChild } from '@angular/core';
import { JobService } from '../services/job.service';
import { PER_PAGE, PAGINATION_MAX_SIZE, ROUTES } from '../../../general/models/constants';
import { SelectedPage } from '../../../general/models/paged-data.model';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkType } from '../../../general/enums/worktype.enum';
import { isTypeValid, GetWorkTypeName } from '../../../general/helpers/enum.helper';
import { JobFilterModel } from '../../../general/models/jobs/job-filter.model';
import { JobExtraColumnsModel } from '../../../general/models/jobs/job-extra-columns.model';

@Component({
  templateUrl: 'job-list.component.html'
})
export class JobListComponent implements OnInit {
  currentPage = 1;
  totalItems = 0;
  perPage = PER_PAGE;
  maxSize = PAGINATION_MAX_SIZE;
  workType: WorkType;
  workTypeName: string;
  datasource: any[] = [];
  errorMessage = null;
  searchTerm = '';
  status = false;
  jobExtraColumns: JobExtraColumnsModel;

  constructor(private router: Router, private route: ActivatedRoute, private jobService: JobService) {

  }

  get jobFilter(): JobFilterModel {
    const jobFilter = new JobFilterModel();
    jobFilter.active = this.status === false;
    jobFilter.invoiced = this.status === true;
    jobFilter.readyToBill = false;
    jobFilter.page = this.currentPage;
    jobFilter.searchTerm = this.searchTerm;
    return jobFilter;
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      if (data['type']) {
        const workType = data['type'] as number;
        this.workType = WorkType[WorkType[workType]];
        if (isTypeValid(this.workType)) {
          this.workTypeName = GetWorkTypeName(this.workType);
          this.jobExtraColumns = JobExtraColumnsModel.createInstance(this.workType);
          this.getList();
        } else {
          this.router.navigate([ROUTES.notfound]);
        }
      }
    });
  }

  getList(event?: SelectedPage) {
    this.currentPage = event ? event.page : 1;
    this.jobService.getList(this.workType, this.jobFilter).then(response => {
      this.datasource = response.data;
      this.totalItems = response.totalRecords;
    });
  }

  redirectToUpdate(id: number) {
    this.router.navigate([`${ROUTES.jobs}/${this.workType}/update/${id}`]);
  }
}
