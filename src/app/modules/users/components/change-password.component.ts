import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { mustMatch } from '../../../general/helpers/must-match.validator';
import { UserService } from '../services/user.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ROUTES } from '../../../general/models/constants';
import { UserModel } from '../../../general/models/users/user.model';
import { ToastService } from '../../../general/services/toast.service';
import { AuthenticationService } from '../../../general/services/authentication.service';
import { ChangePasswordRequest } from '../../../general/models/change-password.request';
import { LocalStorageService } from '../../../general/services/localstorage.service';

@Component({
    selector: 'app-change-password',
    templateUrl: 'change-password.component.html'
})
export class ChangePasswordComponent implements OnInit, AfterViewInit {

    @ViewChild('firstControl')
    firstControl: ElementRef;

    changePasswordModel: UserModel;
    changePasswordForm: FormGroup;
    submitted = false;
    id = 0;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private element: ElementRef,
        private authenticationService: AuthenticationService,
        private localStorageService: LocalStorageService,
        private toastService: ToastService,
        private formBuilder: FormBuilder) {
    }

    get form() {
        return this.changePasswordForm.controls;
    }

    ngOnInit(): void {
        this.changePasswordForm = this.formBuilder.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        }, {
                validators: mustMatch('password', 'confirmPassword')
            });

        this.resetForm();
    }

    ngAfterViewInit() {
        this.firstControl.nativeElement.focus();
    }

    changePassword() {
        this.submitted = true;
        if (this.changePasswordForm.valid) {
            this.authenticationService.changePassword(ChangePasswordRequest.createIntance(this.localStorageService.loggedInUser.userName, this.changePasswordForm))
                .then(response => {
                    this.toastService.success('Current password is changed successfully');
                    this.resetForm();
                })
                .catch((rejected: RejectedResponse) => {
                    this.toastService.error(rejected.error);
                });
        } else {
            this.focusFirstError();
        }
    }

    resetForm() {
        this.submitted = false;
        this.changePasswordForm.patchValue({ oldPassword: '', newPassword: '', confirmPassword: '' });
    }
    focusFirstError() {
        const invalidControls = this.element.nativeElement.querySelectorAll('.form-control.ng-invalid');
        (<HTMLInputElement>invalidControls[0]).focus();
    }
}

