import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../general/guards/auth.guard';
import { JobListComponent } from './components/job-list.component';
import { UpdateJobComponent } from './components/update-job.component';
import { BidJobComponent } from './components/bid-job.component';

const routes: Routes = [
  {
    path: '',
    component: JobListComponent,
    data: {
      title: 'Jobs'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'bid',
    component: BidJobComponent,
    data: {
      title: 'Jobs'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'update/:id',
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
