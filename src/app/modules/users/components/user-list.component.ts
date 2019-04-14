import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import { PER_PAGE } from '../../../general/models/constants';

@Component({
  templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit {
  currentPage = 1;
  totalItems = 0;
  perPage = PER_PAGE;
  datasource: UserModel[] = [];

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.userService.getList(this.currentPage).then(response => {
      this.datasource = response.data;
      this.totalItems = response.totalRecords;
    });
  }
}
