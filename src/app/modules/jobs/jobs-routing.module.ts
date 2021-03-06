import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../general/guards/auth.guard';
import { JobListComponent } from './components/job-list.component';
import { UpdateJobComponent } from './components/update-job.component';
import { BidJobComponent } from './components/bid-job.component';
import { BidJobListComponent } from './components/bid-job-list.component';
import { ViewJobComponent } from './components/view-job.component';

const routes: Routes = [
  {
    path: 'bid',
    component: BidJobComponent,
    data: {
      title: 'Jobs'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'editjob/:type',
    component: BidJobListComponent,
    data: {
      title: 'Jobs'
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':type/view/:id',
    component: ViewJobComponent,
    data: {
      title: 'Jobs'
    },
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: JobListComponent,
    data: {
      title: 'Jobs'
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':type',
    component: JobListComponent,
    data: {
      title: 'Jobs'
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':type/update/:id',
    component: UpdateJobComponent,
    data: {
      title: 'Jobs'
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule { }
