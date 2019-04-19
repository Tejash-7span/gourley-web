import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import { PER_PAGE } from '../../../general/models/constants';
import { SelectedPage } from '../../../general/models/paged-data.model';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit {
  currentPage = 1;
  totalItems = 0;
  perPage = PER_PAGE;
  datasource: UserModel[] = [];

  constructor(private router: Router, private userService: UserService) {

  }

  ngOnInit(): void {
    this.getList(null);
  }

  getList(event: SelectedPage) {
    const page = event ? event.page : 1;
    this.userService.getList(page).then(response => {
      this.datasource = response.data;
      this.totalItems = response.totalRecords;
    });
  }
  redirectTo(path) {
    this.router.navigate([path]);
  }
}
