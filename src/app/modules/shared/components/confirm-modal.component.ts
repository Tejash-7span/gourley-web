import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-confirm-modal',
    templateUrl: 'confirm-modal.component.html'
})

export class ConfirmModalComponent {
    @Input()
    type = 'info';

    @Input()
    title = 'info';

    @Input()
    message = 'info';

    @Output()
    confirm: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('yesButton')
    yesButton: ElementRef;

    private data: any = null;

    @ViewChild('confirmModal')
    public confirmModal: ModalDirective;

    constructor() { }

    show(data: any) {
        this.data = data;
        this.confirmModal.show();
        setTimeout(() => {
            this.yesButton.nativeElement.focus();
        }, 500);
    }

    onConfirm() {
        this.confirmModal.hide();
        this.confirm.emit(this.data);
    }
}


