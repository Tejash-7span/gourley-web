import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusService } from '../services/status.service';
import { PER_PAGE, PAGINATION_MAX_SIZE } from '../../../general/models/constants';
import { SelectedPage } from '../../../general/models/paged-data.model';
import { Router } from '@angular/router';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal.component';
import { StatusModel } from '../../../general/models/status/status.model';

@Component({
  templateUrl: 'status-list.component.html'
})
export class StatusListComponent implements OnInit {
  currentPage = 1;
  totalItems = 0;
  perPage = PER_PAGE;
  maxSize = PAGINATION_MAX_SIZE;
  datasource: StatusModel[] = [];
  errorMessage = null;
  searchTerm = '';

  @ViewChild('deleteConfirmModal')
  deleteConfirmModal: ConfirmModalComponent;

  constructor(private router: Router, private statusService: StatusService) {

  }

  ngOnInit(): void {
    this.getList();
  }

  getList(event?: SelectedPage) {
    this.currentPage = event ? event.page : 1;
    this.statusService.getList(this.currentPage, this.searchTerm).then(response => {
      this.datasource = response.data;
      this.totalItems = response.totalRecords;
    });
  }

  confirmDelete(id: number) {
    this.deleteConfirmModal.show(id);
  }

  deleteStatus(id: number) {
    this.statusService.deleteStatus(id)
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
}
