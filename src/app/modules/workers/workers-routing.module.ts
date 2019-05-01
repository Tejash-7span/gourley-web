import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../general/guards/auth.guard';
import { WorkerListComponent } from './components/worker-list.component';
import { CreateWorkerComponent } from './components/create-worker.component';
import { UpdateWorkerComponent } from './components/update-worker.component';

const routes: Routes = [
  {
    path: '',
    component: WorkerListComponent,
    data: {
      title: 'Workers'
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':type',
    component: WorkerListComponent,
    data: {
      title: 'Workers'
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':type/create',
    component: CreateWorkerComponent,
    data: {
      title: 'Workers'
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':type/update/:id',
    component: UpdateWorkerComponent,
    data: {
      title: 'Workers'
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkersRoutingModule { }
