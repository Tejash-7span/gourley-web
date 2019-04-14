import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../general/guards/auth.guard';
import { UserListComponent } from './components/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
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
