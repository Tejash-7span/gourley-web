import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './components/user-list.component';
import { UserService } from './services/user.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  declarations: [UserListComponent],
  providers: [UserService]
})
export class UsersModule { }
