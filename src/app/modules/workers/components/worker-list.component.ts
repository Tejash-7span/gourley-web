import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkerService } from '../../../general/services/worker.service';
import { PER_PAGE, PAGINATION_MAX_SIZE, ROUTES } from '../../../general/models/constants';
import { SelectedPage } from '../../../general/models/paged-data.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal.component';
import { JobTypeEnum } from '../../../general/enums/worktype.enum';
import { WorkerModel } from '../../../general/models/workers/worker.model';
import { JobType } from '../../../general/models/jobtype/job-type.model';
import { LocalStorageService } from '../../../general/services/localstorage.service';
import { ToastService } from '../../../general/services/toast.service';

@Component({
  templateUrl: 'worker-list.component.html'
})
export class WorkerListComponent implements OnInit {
  currentPage = 1;
  totalItems = 0;
  perPage = PER_PAGE;
  maxSize = PAGINATION_MAX_SIZE;
  jobType: JobType;
  jobTypeName: string;
  datasource: WorkerModel[] = [];
  searchTerm = '';
  jobTypes: JobType[];

  @ViewChild('deleteConfirmModal')
  deleteConfirmModal: ConfirmModalComponent;

  constructor(private router: Router,
    private localStorageService: LocalStorageService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private workerService: WorkerService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.jobTypes = this.localStorageService.jobTypes.filter(type => type.workerEnabled);
      const firstJobType = this.jobTypes.find(jobType => jobType.workerEnabled);
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
  }

  onJobTypeSelect(jobType: JobType) {
    this.redirectTo(`${ROUTES.workers}/${jobType.id}`);
  }

  getList(event?: SelectedPage) {
    this.currentPage = event ? event.page : 1;
    this.workerService.getList(this.jobType.id, this.currentPage, this.searchTerm).then(response => {
      this.datasource = response.data;
      this.totalItems = response.totalRecords;
    });
  }

  confirmDelete(id: number) {
    this.deleteConfirmModal.show(id);
  }

  deleteWorker(id: number) {
    this.workerService.deleteWorker(this.jobType.id, id)
      .then(response => {
        this.toastService.success('Worker is deleted successfully');
        if (this.datasource.length === 1) {
          this.getList({ page: this.currentPage - 1, itemsPerPage: PER_PAGE });
        } else {
          this.getList({ page: this.currentPage, itemsPerPage: PER_PAGE });
        }
      })
      .catch((rejected: RejectedResponse) => {
        this.toastService.error(rejected.error);
      });
  }

  redirectTo(path) {
    this.router.navigate([path]);
  }

  redirectToCreate() {
    this.router.navigate([`${ROUTES.workers}/${this.jobType.id}/create`]);
  }

  redirectToUpdate(id: number) {
    this.router.navigate([`${ROUTES.workers}/${this.jobType.id}/update/${id}`]);
  }
}
