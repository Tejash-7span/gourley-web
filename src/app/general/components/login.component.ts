import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { LoginRequest } from '../models/login.request';
import { RejectedResponse } from '../services/rest.service';
import { LoginResponse } from '../models/login.response';
import { LocalStorageService } from '../services/localstorage.service';
import { UserSessionModel } from '../models/user-session.model';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ROUTES } from '../models/constants';
import { JobTypeService } from '../services/job-type.service';
import { JobType } from '../models/jobtype/job-type.model';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  loginForm: FormGroup;
  submitted = false;

  constructor(private element: ElementRef,
    private auth: AuthenticationService,
    private localStorageService: LocalStorageService,
    private jobTypeService: JobTypeService,
    private router: Router,
    private formBuilder: FormBuilder) {

  }

  get form() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn) {
      this.router.navigate([ROUTES.dashboard]);
    }

    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login() {
    this.submitted = true;
    this.errorMessage = null;
    if (this.loginForm.valid) {
      this.auth.login(LoginRequest.createInstance(this.loginForm))
        .then((response: LoginResponse) => {
          this.setUser(response);
          this.errorMessage = null;
          this.jobTypeService.getAll().then((jobTypes: JobType[]) => {
            this.localStorageService.jobTypes = jobTypes;
            this.router.navigate([ROUTES.dashboard]);
          }).catch((jobTypeReject: RejectedResponse) => {
            this.errorMessage = jobTypeReject.error;
          });
        })
        .catch((reject: RejectedResponse) => {
          this.errorMessage = reject.error;
        });
    } else {
      this.focusFirstError();
    }
  }

  private setUser(response: LoginResponse) {
    this.localStorageService.loggedInUser = new UserSessionModel(
      response.user.id,
      response.user.firstName,
      response.user.lastName,
      response.user.userName,
      response.user.imageUrl);
    this.localStorageService.token = response.token;
  }

  register() {
    this.router.navigate([ROUTES.register]);

  }

  focusFirstError() {
    const invalidControls = this.element.nativeElement.querySelectorAll('.form-control.ng-invalid');
    (<HTMLInputElement>invalidControls[0]).focus();
  }
}

