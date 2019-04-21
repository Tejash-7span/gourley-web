import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { WorkersRoutingModule } from './workers-routing.module';
import { WorkerListComponent } from './components/worker-list.component';
import { WorkerService } from './services/worker.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';
import { CreateWorkerComponent } from './components/create-worker.component';
import { UpdateWorkerComponent } from './components/update-worker.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkersRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TabsModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    SharedModule
  ],
  declarations: [
    WorkerListComponent,
    CreateWorkerComponent,
    UpdateWorkerComponent
  ],
  providers: [WorkerService]
})
export class WorkersModule { }
