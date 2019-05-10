import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { PER_PAGE, PAGINATION_MAX_SIZE } from '../../../general/models/constants';
import { SelectedPage } from '../../../general/models/paged-data.model';
import { Router } from '@angular/router';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal.component';
import { UserModel } from '../../../general/models/users/user.model';
import { ToastService } from '../../../general/services/toast.service';

@Component({
  templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit {
  currentPage = 1;
  totalItems = 0;
  perPage = PER_PAGE;
  maxSize = PAGINATION_MAX_SIZE;
  datasource: UserModel[] = [];
  searchTerm = '';

  @ViewChild('deleteConfirmModal')
  deleteConfirmModal: ConfirmModalComponent;

  constructor(private router: Router,
    private userService: UserService,
    private toastService: ToastService) {

  }

  ngOnInit(): void {
    this.getList();
  }

  getList(event?: SelectedPage) {
    this.currentPage = event ? event.page : 1;
    this.userService.getList(this.currentPage, this.searchTerm).then(response => {
      this.datasource = response.data;
      this.totalItems = response.totalRecords;
    });
  }

  confirmDelete(id: number) {
    this.deleteConfirmModal.show(id);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .then(response => {
        this.toastService.success('User is deleted successfully');
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
