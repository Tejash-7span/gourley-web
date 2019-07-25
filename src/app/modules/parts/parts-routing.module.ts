import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../general/guards/auth.guard';
import { PartListComponent } from './components/part-list.component';
import { CreatePartComponent } from './components/create-part.component';
import { UpdatePartComponent } from './components/update-part.component';

const routes: Routes = [
  {
    path: '',
    component: PartListComponent,
    data: {
      title: 'Parts'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreatePartComponent,
    data: {
      title: 'Parts'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'update/:id',
    component: UpdatePartComponent,
    data: {
      title: 'Parts'
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':type',
    component: PartListComponent,
    data: {
      title: 'Parts'
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartsRoutingModule { }
