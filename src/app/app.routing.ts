import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './general/components/login.component';
import { AuthGuard } from './general/guards/auth.guard';
import { RegisterComponent } from './general/components/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'users',
        loadChildren: './modules/users/users.module#UsersModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'masters/parts',
        loadChildren: './modules/parts/parts.module#PartsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'masters/workers',
        loadChildren: './modules/workers/workers.module#WorkersModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'masters/status',
        loadChildren: './modules/status/status.module#StatusModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'jobs',
        loadChildren: './modules/jobs/jobs.module#JobsModule',
        canActivate: [AuthGuard]
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
