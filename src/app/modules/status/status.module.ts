import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { StatusRoutingModule } from './status-routing.module';
import { StatusListComponent } from './components/status-list.component';
import { StatusService } from './services/status.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';
import { CreateStatusComponent } from './components/create-status.component';
import { UpdateStatusComponent } from './components/update-status.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StatusRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TabsModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    SharedModule
  ],
  declarations: [
    StatusListComponent,
    CreateStatusComponent,
    UpdateStatusComponent
  ],
  providers: [StatusService]
})
export class StatusModule { }
