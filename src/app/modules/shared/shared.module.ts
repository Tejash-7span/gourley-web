import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal/';
import { ConfirmModalComponent } from './components/confirm-modal.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { UserLetterComponent } from './components/user-letter.component';
import { PaginationDetailsComponent } from './components/pagination-details.component';

// Angular

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalModule.forRoot()
    ],
    declarations: [
        ConfirmModalComponent,
        UserLetterComponent,
        PaginationDetailsComponent
    ],
    exports: [
        ConfirmModalComponent,
        UserLetterComponent,
        PaginationDetailsComponent
    ]
})
export class SharedModule { }
