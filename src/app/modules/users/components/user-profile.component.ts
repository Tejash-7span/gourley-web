import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ROUTES } from '../../../general/models/constants';
import { UserModel } from '../../../general/models/users/user.model';
import { ToastService } from '../../../general/services/toast.service';
import { LocalStorageService } from '../../../general/services/localstorage.service';
import { HttpEventType } from '@angular/common/http';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal.component';
import { MessageService } from '../../../general/services/message.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: 'user-profile.component.html'
})
export class UserProfileComponent implements OnInit, AfterViewInit {
    @ViewChild('firstControl')
    firstControl: ElementRef;

    @ViewChild('clearImageConfirmModal')
    clearImageConfirmModal: ConfirmModalComponent;

    @ViewChild('fileUpload')
    fileUpload: ElementRef;

    userForm: FormGroup;
    submitted = false;
    id = 0;
    existing: UserModel;
    imageUrl: string;
    progress = 0;

    constructor(private router: Router,
        private element: ElementRef,
        private userService: UserService,
        private toastService: ToastService,
        private messageService: MessageService,
        private localStorageService: LocalStorageService,
        private formBuilder: FormBuilder) {
    }

    get form() {
        return this.userForm.controls;
    }

    ngOnInit(): void {
        this.userForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.email],
            userName: ['', Validators.required],
            workType: [''],
            admin: ['']
        });
        this.id = this.localStorageService.loggedInUser.id;
        this.loadUser();
    }

    ngAfterViewInit() {
        this.firstControl.nativeElement.focus();
    }

    uploadImage(event: any) {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('file', file);

            this.userService.uploadImage(this.id, formData).subscribe((uploadEvent: any) => {
                switch (uploadEvent.type) {
                    case HttpEventType.UploadProgress:
                        this.progress = Math.round(100 * uploadEvent.loaded / uploadEvent.total);
                        break;
                    case HttpEventType.Response:
                        const response = uploadEvent.body;
                        this.existing.imageUrl = this.imageUrl = response.fileName;
                        this.progress = 0;
                        const loggedInUser = this.localStorageService.loggedInUser;
                        loggedInUser.imageUrl = response.fileName;
                        this.localStorageService.loggedInUser = loggedInUser;
                        this.messageService.sendImageUploadedMessage();
                        this.fileUpload.nativeElement.value = '';
                        this.toastService.success('Profile image is uploaded successfully.');
                        break;
                }

            }, error => {
                this.toastService.error('Uploading profile image failed.');
                this.fileUpload.nativeElement.value = '';
            });
        }
    }

    confirmClearImage() {
        this.clearImageConfirmModal.show(this.id);
    }

    clearImage(event: any) {
        this.userService.clearImage(this.id)
            .then(response => {
                this.existing.imageUrl = this.imageUrl = null;
                const loggedInUser = this.localStorageService.loggedInUser;
                loggedInUser.imageUrl = null;
                this.localStorageService.loggedInUser = loggedInUser;
                this.messageService.sendImageUploadedMessage();
                this.toastService.success('Profile is cleared successfully');
            })
            .catch((rejected: RejectedResponse) => {
                this.toastService.error(rejected.error);
            });
    }

    saveUser() {
        this.submitted = true;
        if (this.userForm.valid) {
            this.userService.updateUser(UserModel.createInstance(this.id, this.userForm))
                .then(response => {
                    this.toastService.success('Profile is updated successfully');
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
        this.loadUser();
    }

    loadUser() {
        if (this.existing) {
            this.userForm.patchValue(this.existing);
        } else {

            this.userService.get(this.id)
                .then((response: UserModel) => {
                    this.existing = response;
                    this.imageUrl = this.existing.imageUrl;
                    this.userForm.patchValue(response);
                })
                .catch((rejected: RejectedResponse) => {
                    this.toastService.error(rejected.error);
                });
        }
    }
    focusFirstError() {
        const invalidControls = this.element.nativeElement.querySelectorAll('.form-control.ng-invalid');
        (<HTMLInputElement>invalidControls[0]).focus();
    }
}

