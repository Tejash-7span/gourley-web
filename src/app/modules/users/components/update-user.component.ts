import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { mustMatch } from '../../../general/helpers/must-match.validator';
import { UserService } from '../services/user.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { UserModel } from '../models/user.model';
import { ROUTES } from '../../../general/models/constants';

@Component({
    selector: 'app-update-user',
    templateUrl: 'update-user.component.html'
})
export class UpdateUserComponent implements OnInit {

    errorMessage: string;
    userForm: FormGroup;
    submitted = false;
    id = 0;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
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

        this.userForm.patchValue({ admin: false });

        this.route.params.subscribe(data => {
            if (data['id']) {
                this.id = data['id'];
                if (this.id > 0) {
                    this.loadUser();
                }
            }
        });
    }

    saveUser() {
        this.submitted = true;
        if (this.userForm.valid) {
            this.userService.updateUser(UserModel.createInstance(this.id, this.userForm))
                .then(response => {
                    this.backToList();
                })
                .catch((rejected: RejectedResponse) => {
                    this.errorMessage = rejected.error;
                });
        }
    }

    backToList() {
        this.router.navigate([ROUTES.users]);
    }

    private loadUser() {
        this.userService.get(this.id)
            .then((response: UserModel) => {
                this.userForm.patchValue(response);
            })
            .catch((rejected: RejectedResponse) => {
                this.errorMessage = rejected.error;
            });
    }
}

