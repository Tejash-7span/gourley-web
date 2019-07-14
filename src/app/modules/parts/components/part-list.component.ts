import { Component, OnInit, ViewChild } from '@angular/core';
import { PER_PAGE, PAGINATION_MAX_SIZE, PRICE_FORMAT, ROUTES } from '../../../general/models/constants';
import { SelectedPage } from '../../../general/models/paged-data.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal.component';
import { PartModel } from '../../../general/models/parts/part.model';
import { PartService } from '../../../general/services/part.service';
import { ToastService } from '../../../general/services/toast.service';
import { JobType } from '../../../general/models/jobtype/job-type.model';
import { LocalStorageService } from '../../../general/services/localstorage.service';

@Component({
  templateUrl: 'part-list.component.html'
})
export class PartListComponent implements OnInit {
  currentPage = 1;
  totalItems = 0;
  perPage = PER_PAGE;
  maxSize = PAGINATION_MAX_SIZE;
  datasource: PartModel[] = [];
  searchTerm = '';
  priceFormat = PRICE_FORMAT;
  jobType: JobType;
  jobTypes: JobType[] = [];

  @ViewChild('deleteConfirmModal')
  deleteConfirmModal: ConfirmModalComponent;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private partService: PartService,
    private localStorageService: LocalStorageService,
    private toastService: ToastService) {

  }

  ngOnInit(): void {
    console.log('parts');
    this.route.params.subscribe(data => {
      this.jobTypes = this.localStorageService.jobTypes.filter(type => type.jobEnabled);
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

  getList(event?: SelectedPage) {
    this.currentPage = event ? event.page : 1;
    this.partService.getList(this.jobType.id, this.currentPage, this.searchTerm).then(response => {
      this.datasource = response.data;
      this.totalItems = response.totalRecords;
    });
  }

  confirmDelete(id: number) {
    this.deleteConfirmModal.show(id);
  }

  deletePart(id: number) {
    this.partService.deletePart(id)
      .then(response => {
        this.toastService.success('Part is deleted successfully');
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

  selectJobType(jobType: JobType) {
    this.jobType = jobType;
  }

  onJobTypeSelect(jobType: JobType) {
    this.redirectTo(`${ROUTES.parts}/${jobType.id}`);
  }
}
