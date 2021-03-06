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
import { JobPartListComponent } from './components/job-part-list.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BidJobListComponent } from './components/bid-job-list.component';
import { MyDatePickerModule } from 'mydatepicker';
import { AdvancedSearchComponent } from './components/advanced-search.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ViewJobComponent } from './components/view-job.component';

export const maskOptions: Partial<IConfig> | (() => Partial<IConfig>) = {

};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JobsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TabsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    NgxMaskModule.forRoot(maskOptions),
    MyDatePickerModule,
    SharedModule
  ],
  declarations: [
    JobListComponent,
    UpdateJobComponent,
    BidJobComponent,
    JobPartListComponent,
    BidJobListComponent,
    ViewJobComponent,
    AdvancedSearchComponent
  ],
  providers: [JobService]
})
export class JobsModule { }
