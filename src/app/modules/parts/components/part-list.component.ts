import { Component, OnInit, ViewChild } from '@angular/core';
import { PER_PAGE, PAGINATION_MAX_SIZE, PRICE_FORMAT } from '../../../general/models/constants';
import { SelectedPage } from '../../../general/models/paged-data.model';
import { Router } from '@angular/router';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal.component';
import { PartModel } from '../../../general/models/parts/part.model';
import { PartService } from '../../../general/services/part.service';
import { ToastService } from '../../../general/services/toast.service';

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

  @ViewChild('deleteConfirmModal')
  deleteConfirmModal: ConfirmModalComponent;

  constructor(private router: Router,
    private partService: PartService,
    private toastService: ToastService) {

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
}
