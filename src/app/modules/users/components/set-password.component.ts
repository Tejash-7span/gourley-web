import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { mustMatch } from '../../../general/helpers/must-match.validator';
import { UserService } from '../services/user.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ROUTES } from '../../../general/models/constants';
import { UserModel } from '../../../general/models/users/user.model';
import { ToastService } from '../../../general/services/toast.service';

@Component({
    selector: 'app-set-password',
    templateUrl: 'set-password.component.html'
})
export class SetPasswordComponent implements OnInit, AfterViewInit {

    @ViewChild('firstControl')
    firstControl: ElementRef;


    userModel: UserModel;
    userForm: FormGroup;
    submitted = false;
    id = 0;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private element: ElementRef,
        private userService: UserService,
        private toastService: ToastService,
        private formBuilder: FormBuilder) {
    }

    get form() {
        return this.userForm.controls;
    }

    ngOnInit(): void {
        this.userForm = this.formBuilder.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        }, {
                validators: mustMatch('password', 'confirmPassword')
            });

        this.resetForm();
        this.route.params.subscribe(data => {
            if (data['id']) {
                this.id = data['id'];
                this.loadUser();
            } else {
                this.router.navigate([ROUTES.users]);
            }
        });
    }

    ngAfterViewInit() {
        this.firstControl.nativeElement.focus();
    }

    saveUser() {
        this.submitted = true;
        if (this.userForm.valid) {
            this.userModel.password = this.userForm.value['password'];
            this.userService.updateUser(this.userModel)
                .then(response => {
                    this.toastService.success('New password is set successfully');
                    this.backToList();
                })
                .catch((rejected: RejectedResponse) => {
                    this.toastService.error(rejected.error);
                });
        } else {
            this.focusFirstError();
        }
    }

    backToList() {
        this.router.navigate([ROUTES.users]);
    }

    resetForm() {
        this.submitted = false;
        this.userForm.patchValue({ password: '', confirmPassword: '' });
    }

    loadUser() {
        this.userService.get(this.id)
            .then((response: UserModel) => {
                this.userModel = response;
            })
            .catch((rejected: RejectedResponse) => {
                this.toastService.error(rejected.error);
            });
    }
    focusFirstError() {
        const invalidControls = this.element.nativeElement.querySelectorAll('.form-control.ng-invalid');
        (<HTMLInputElement>invalidControls[0]).focus();
    }
}

