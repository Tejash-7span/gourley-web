import { Component, OnInit, ViewChild } from '@angular/core';
import { JobService } from '../services/job.service';
import { PER_PAGE, PAGINATION_MAX_SIZE, ROUTES } from '../../../general/models/constants';
import { SelectedPage } from '../../../general/models/paged-data.model';
import { Router, ActivatedRoute } from '@angular/router';
import { JobTypeEnum } from '../../../general/enums/worktype.enum';
import { JobFilterModel } from '../../../general/models/jobs/job-filter.model';
import { JobExtraColumnsModel } from '../../../general/models/jobs/job-extra-columns.model';
import { JobType } from '../../../general/models/jobtype/job-type.model';
import { LocalStorageService } from '../../../general/services/localstorage.service';

@Component({
  selector: 'app-job-list',
  templateUrl: 'job-list.component.html'
})
export class JobListComponent implements OnInit {
  currentPage = 1;
  totalItems = 0;
  perPage = PER_PAGE;
  maxSize = PAGINATION_MAX_SIZE;
  jobType: JobType;
  jobTypes: JobType[] = [];
  workTypeName: string;
  datasource: any[] = [];
  errorMessage = null;
  searchTerm = '';
  status = false;
  jobExtraColumns: JobExtraColumnsModel;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private jobService: JobService,
    private localStorageService: LocalStorageService) {

  }

  get jobFilter(): JobFilterModel {
    const jobFilter = new JobFilterModel();
    // jobFilter.active = this.status === false;
    // jobFilter.invoiced = this.status === true;
    // jobFilter.readyToBill = false;
    jobFilter.page = this.currentPage;
    jobFilter.searchTerm = this.searchTerm;
    return jobFilter;
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.jobTypes = this.localStorageService.jobTypes.filter(type => type.workerEnabled);
      const firstJobType = this.jobTypes.find(jobType => jobType.workerEnabled);
      if (!firstJobType) {
        this.errorMessage = 'Job Types not found. Please try again or contact your administrator';
      } else {
        if (data['type']) {
          const jobTypeId = +data['type'];
          const selectedJobType = this.jobTypes.find(jobType => jobType.id === jobTypeId);
          if (selectedJobType) {
            this.selectJobType(selectedJobType);
            this.getList();
          } else {
            this.router.navigate([ROUTES.notfound]);
          }
        } else {
          this.selectJobType(firstJobType);
          this.getList();
        }
      }
    });
  }

  selectJobType(jobType: JobType) {
    this.jobType = jobType;
    this.jobExtraColumns = JobExtraColumnsModel.createInstance(this.jobType.id);
  }

  onJobTypeSelect(jobType: JobType) {
    this.redirectTo(`${ROUTES.jobs}/${jobType.id}`);
  }

  redirectTo(path) {
    this.router.navigate([path]);
  }

  getList(event?: SelectedPage) {
    this.currentPage = event ? event.page : 1;
    this.jobService.getList(this.jobType.id, this.jobFilter).then(response => {
      this.datasource = response.data;
      this.totalItems = response.totalRecords;
    });
  }

  redirectToUpdate(id: number) {
    this.router.navigate([`${ROUTES.jobs}/${this.jobType.id}/update/${id}`]);
  }
}
