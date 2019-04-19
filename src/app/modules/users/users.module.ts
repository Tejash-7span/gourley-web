import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './components/user-list.component';
import { UserService } from './services/user.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './components/create-user.component';
import { UpdateUserComponent } from './components/update-user.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SetPasswordComponent } from './components/set-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TabsModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  declarations: [UserListComponent, CreateUserComponent, UpdateUserComponent, SetPasswordComponent],
  providers: [UserService]
})
export class UsersModule { }
