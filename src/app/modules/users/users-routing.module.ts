import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../general/guards/auth.guard';
import { UserListComponent } from './components/user-list.component';
import { CreateUserComponent } from './components/create-user.component';
import { UpdateUserComponent } from './components/update-user.component';
import { SetPasswordComponent } from './components/set-password.component';
import { ChangePasswordComponent } from './components/change-password.component';
import { UserProfileComponent } from './components/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    data: {
      title: 'Users'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateUserComponent,
    data: {
      title: 'Users'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'changepassword',
    component: ChangePasswordComponent,
    data: {
      title: 'Users'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'myprofile',
    component: UserProfileComponent,
    data: {
      title: 'Users'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'update/:id',
    component: UpdateUserComponent,
    data: {
      title: 'Users'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'set-password/:id',
    component: SetPasswordComponent,
    data: {
      title: 'Users'
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }
