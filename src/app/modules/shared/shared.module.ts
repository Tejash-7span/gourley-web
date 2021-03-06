import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal/';
import { ConfirmModalComponent } from './components/confirm-modal.component';
import { UserImageComponent } from './components/user-image.component';
import { PaginationDetailsComponent } from './components/pagination-details.component';
import { JobTypeNamePipe } from './pipes/job-name.pipe';

// Angular

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalModule.forRoot()
    ],
    declarations: [
        ConfirmModalComponent,
        UserImageComponent,
        PaginationDetailsComponent,
        JobTypeNamePipe,
    ],
    exports: [
        ConfirmModalComponent,
        UserImageComponent,
        PaginationDetailsComponent,
        JobTypeNamePipe
    ]
})
export class SharedModule { }
