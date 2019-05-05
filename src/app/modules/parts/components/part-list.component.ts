import { Component, OnInit, ViewChild } from '@angular/core';
import { PER_PAGE, PAGINATION_MAX_SIZE } from '../../../general/models/constants';
import { SelectedPage } from '../../../general/models/paged-data.model';
import { Router } from '@angular/router';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal.component';
import { PartModel } from '../../../general/models/parts/part.model';
import { PartService } from '../../../general/services/part.service';

@Component({
  templateUrl: 'part-list.component.html'
})
export class PartListComponent implements OnInit {
  currentPage = 1;
  totalItems = 0;
  perPage = PER_PAGE;
  maxSize = PAGINATION_MAX_SIZE;
  datasource: PartModel[] = [];
  errorMessage = null;
  searchTerm = '';

  @ViewChild('deleteConfirmModal')
  deleteConfirmModal: ConfirmModalComponent;

  constructor(private router: Router, private partService: PartService) {

  }

  ngOnInit(): void {
    this.getList();
  }

  getList(event?: SelectedPage) {
    this.currentPage = event ? event.page : 1;
    this.partService.getList(this.currentPage, this.searchTerm).then(response => {
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
