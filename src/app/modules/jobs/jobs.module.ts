import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobListComponent } from './components/job-list.component';
import { JobService } from './services/job.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from '../shared/shared.module';
import { UpdateJobComponent } from './components/update-job.component';
import { BidJobComponent } from './components/bid-job.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JobsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TabsModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    SharedModule
  ],
  declarations: [
    JobListComponent,
    UpdateJobComponent,
    BidJobComponent
  ],
  providers: [JobService]
})
export class JobsModule { }
