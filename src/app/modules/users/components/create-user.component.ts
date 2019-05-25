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
  selector: 'app-create-user',
  templateUrl: 'create-user.component.html'
})
export class CreateUserComponent implements OnInit, AfterViewInit {

  @ViewChild('firstControl')
  firstControl: ElementRef;


  userForm: FormGroup;
  submitted = false;



  constructor(private router: Router,
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
      firstName: ['', [Validators.required, Validators.maxLength(45)]],
      lastName: ['', [Validators.required, Validators.maxLength(45)]],
      email: ['', [Validators.email, Validators.maxLength(100)]],
      userName: ['', [Validators.required, Validators.maxLength(45)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      workType: [''],
      admin: ['']
    }, {
        validators: mustMatch('password', 'confirmPassword')
      }
    );

    this.resetForm();
  }

  ngAfterViewInit() {
    this.firstControl.nativeElement.focus();
  }

  saveUser() {
    this.submitted = true;
    if (this.userForm.valid) {
      this.userService.createUser(UserModel.createInstance(0, this.userForm))
        .then(response => {
          this.backToList();
          this.toastService.success('User is created successfully');
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
    const user = new UserModel();
    this.userForm.patchValue({ ...user, ...{ confirmPassword: '' } });
  }

  backToList() {
    this.router.navigate([ROUTES.users]);
  }
  focusFirstError() {
    const invalidControls = this.element.nativeElement.querySelectorAll('.form-control.ng-invalid');
    (<HTMLInputElement>invalidControls[0]).focus();
  }
}

