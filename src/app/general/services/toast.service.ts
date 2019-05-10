import { Injectable } from '@angular/core';
import { ToastrService, ToastrConfig, ProgressAnimationType } from 'ngx-toastr';

@Injectable()
export class ToastService {
    private animationType: ProgressAnimationType = 'increasing';
    private successToastOptions = {
        positionClass: 'toast-top-center',
        timeOut: 2500
    };

    private errorToastOptions = {
        positionClass: 'toast-top-center',
        closeButton: true,
    };
    constructor(private toastService: ToastrService) {

    }

    public success(message: string, title?: string): void {
        this.toastService.success(message, title, this.successToastOptions);
    }

    public error(message: string, title?: string): void {
        this.toastService.error(message, title, this.errorToastOptions);
    }
}
