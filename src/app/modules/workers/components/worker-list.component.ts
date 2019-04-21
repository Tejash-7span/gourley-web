import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkerService } from '../services/worker.service';
import { WorkerModel } from '../models/worker.model';
import { PER_PAGE, PAGINATION_MAX_SIZE, ROUTES } from '../../../general/models/constants';
import { SelectedPage } from '../../../general/models/paged-data.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal.component';
import { WorkType } from '../../../general/enums/worktype.enum';
import { GetWorkTypeName, isTypeValid } from '../../../general/helpers/enum.helper';

@Component({
  templateUrl: 'worker-list.component.html'
})
export class WorkerListComponent implements OnInit {
  currentPage = 1;
  totalItems = 0;
  perPage = PER_PAGE;
  maxSize = PAGINATION_MAX_SIZE;
  workType: WorkType;
  workTypeName: string;
  datasource: WorkerModel[] = [];
  errorMessage = null;
  searchTerm = '';

  @ViewChild('deleteConfirmModal')
  deleteConfirmModal: ConfirmModalComponent;

  constructor(private router: Router, private route: ActivatedRoute, private workerService: WorkerService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      if (data['type']) {
        const workType = data['type'] as number;
        this.workType = WorkType[WorkType[workType]];
        console.log(workType);
        if (isTypeValid(this.workType)) {
          this.workTypeName = GetWorkTypeName(this.workType);
          this.getList(null);
        } else {
          this.router.navigate([ROUTES.notfound]);
        }
      }
    });
  }

  getList(event: SelectedPage) {
    this.currentPage = event ? event.page : 1;
    this.workerService.getList(this.workType, this.currentPage, this.searchTerm).then(response => {
      this.datasource = response.data;
      this.totalItems = response.totalRecords;
    });
  }

  confirmDelete(id: number) {
    this.deleteConfirmModal.show(id);
  }

  deleteWorker(id: number) {
    this.workerService.deleteWorker(this.workType, id)
      .then(response => {
        if (this.datasource.length === 1) {
          this.getList({ page: this.currentPage - 1, itemsPerPage: PER_PAGE });
        } else {
          this.getList({ page: this.currentPage, itemsPerPage: PER_PAGE });
        }
      })
      .catch((rejected: RejectedResponse) => {
        this.errorMessage = rejected.error;
      });
  }

  redirectTo(path) {
    this.router.navigate([path]);
  }

  redirectToCreate() {
    this.router.navigate([`${ROUTES.workers}/${this.workType}/create`]);
  }

  redirectToUpdate(id: number) {
    this.router.navigate([`${ROUTES.workers}/${this.workType}/update/${id}`]);
  }
}
