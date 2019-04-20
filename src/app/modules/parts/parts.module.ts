import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PartsRoutingModule } from './parts-routing.module';
import { PartListComponent } from './components/part-list.component';
import { PartService } from './services/part.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';
import { CreatePartComponent } from './components/create-part.component';
import { UpdatePartComponent } from './components/update-part.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PartsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TabsModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    SharedModule
  ],
  declarations: [
    PartListComponent,
    CreatePartComponent,
    UpdatePartComponent
  ],
  providers: [PartService]
})
export class PartsModule { }
