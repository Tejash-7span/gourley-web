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
import { IAdvancedSearchParams, AdvancedSearchComponent } from './advanced-search.component';
import { ToastService } from '../../../general/services/toast.service';
import { JobListModel } from '../../../general/models/jobs/job-list-model';

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
  datasource: JobListModel[] = [];
  tempDatasource: JobListModel[] = [];
  searchTerm = '';
  jobFilterOption = '1';
  jobExtraColumns: JobExtraColumnsModel;
  jobFilter: JobFilterModel = new JobFilterModel();
  advancedSearchData: IAdvancedSearchParams;
  isAdvancedSearch = false;

  @ViewChild('advancedSearch')
  advancedSearch: AdvancedSearchComponent;

  JobTypeEnum = JobTypeEnum;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private jobService: JobService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService) {
  }


  resetjobFilter() {
    this.jobFilter.active = +this.jobFilterOption === 1;
    this.jobFilter.readyToBill = +this.jobFilterOption === 2;
    this.jobFilter.invoiced = +this.jobFilterOption === 3;
    this.jobFilter.page = this.currentPage;
    this.jobFilter.searchTerm = this.searchTerm;
    this.jobFilter.name = this.advancedSearchData.name;
    this.jobFilter.startDate = this.advancedSearchData.startDate ? new Date(this.advancedSearchData.startDate.jsdate) : null;
    this.jobFilter.endDate = this.advancedSearchData.endDate ? new Date(this.advancedSearchData.endDate.jsdate) : null;
  }

  get isFullList(): boolean {
    return this.jobFilter.active === true || this.jobFilter.readyToBill === true;
  }

  ngOnInit(): void {
    this.resetAdvancedSearchData();
    this.route.queryParams.subscribe(data => {
      if (data['status'] && !isNaN(data['status'])) {
        const status = +data['status'];
        this.jobFilterOption = status >= 1 && status <= 4 ? status.toString() : '1';
      }
    });

    this.route.params.subscribe(data => {
      this.jobTypes = this.localStorageService.jobTypes.filter(type => type.jobEnabled && type.id !== JobTypeEnum[JobTypeEnum[JobTypeEnum.All]]);
      const firstJobType = this.jobTypes.length > 0 ? this.jobTypes[0] : null;
      if (!firstJobType) {
        this.toastService.error('Job Types not found. Please try again or contact your administrator');
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
    this.resetjobFilter();
    if (this.isFullList) {
      const filter: JobFilterModel = new JobFilterModel();
      filter.active = this.jobFilter.active;
      filter.readyToBill = this.jobFilter.readyToBill;
      filter.page = 1;
      this.getFullList(filter);
    } else {
      this.jobService.getList(this.jobType.id, this.jobFilter).then(response => {
        this.datasource = response.data;
        this.totalItems = response.totalRecords;
      });
    }
  }

  getFullList(filter: JobFilterModel) {
    this.jobService.getList(this.jobType.id, filter).then(response => {
      this.tempDatasource = [...this.tempDatasource, ...response.data];
      if (this.tempDatasource.length === response.totalRecords) {
        this.datasource = this.tempDatasource;
        this.tempDatasource = [];
      } else {
        filter.page = filter.page + 1;
        this.getFullList(filter);
      }
    });
  }

  redirectToUpdate(event: Event, id: number) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.router.navigate([`${ROUTES.jobs}/${this.jobType.id}/update/${id}`], { queryParams: { status: this.jobFilterOption } });
  }

  redirectToView(id: number) {
    this.router.navigate([`${ROUTES.jobs}/${this.jobType.id}/view/${id}`], { queryParams: { status: this.jobFilterOption } });
  }


  openAdvancedSearch() {
    this.advancedSearch.show(this.advancedSearchData);
  }

  clearAdvancedSearch() {
    this.resetAdvancedSearchData();
    this.getList();
    this.isAdvancedSearch = false;
  }

  resetAdvancedSearchData() {
    this.advancedSearchData = {
      name: '',
      startDate: null,
      endDate: null
    };
  }

  applyAdvancedSearch(data: IAdvancedSearchParams) {
    this.searchTerm = '';
    this.advancedSearchData = data;
    this.getList();
    this.isAdvancedSearch = true;
  }
}
