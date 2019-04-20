import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal/';
import { ConfirmModalComponent } from './components/confirm-modal.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

// Angular

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalModule.forRoot()
    ],
    declarations: [
        ConfirmModalComponent
    ],
    exports: [
        ConfirmModalComponent
    ]
})
export class SharedModule { }
