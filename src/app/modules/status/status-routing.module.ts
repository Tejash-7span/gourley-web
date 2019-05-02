import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../general/guards/auth.guard';
import { StatusListComponent } from './components/status-list.component';
import { CreateStatusComponent } from './components/create-status.component';
import { UpdateStatusComponent } from './components/update-status.component';

const routes: Routes = [
  {
    path: '',
    component: StatusListComponent,
    data: {
      title: 'Status'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateStatusComponent,
    data: {
      title: 'Status'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'update/:id',
    component: UpdateStatusComponent,
    data: {
      title: 'Status'
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatusRoutingModule { }
