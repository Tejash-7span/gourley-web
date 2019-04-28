import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../modules/users/services/user.service';
import { mustMatch } from '../helpers/must-match.validator';
import { ROUTES } from '../models/constants';
import { RejectedResponse } from '../services/rest.service';
import { UserModel } from '../models/users/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {

  @ViewChild('firstControl')
  firstControl: ElementRef;

  errorMessage: string;
  successMessage: string = null;
  registerationForm: FormGroup;
  submitted = false;
  adminExists = false;
  loading = false;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder) {
  }

  get form() {
    return this.registerationForm.controls;
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getAdmin()
      .then(response => {
        if (response) {
          this.adminExists = true;
          this.errorMessage = 'An admin user already exists.';
        }
        this.loading = false;
      })
      .catch((rejected: RejectedResponse) => {
        if (rejected.status !== 404) {
          this.errorMessage = rejected.error;
        }
        this.loading = false;
      });
    this.registerationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.maxLength(45)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
        validators: mustMatch('password', 'confirmPassword')
      }
    );
  }

  ngAfterViewInit() {
    if (this.firstControl) {
      this.firstControl.nativeElement.focus();
    }
  }

  registerUser() {
    this.submitted = true;
    if (this.registerationForm.valid) {
      const user = new UserModel();
      user.userName = this.registerationForm.value['userName'];
      user.password = this.registerationForm.value['password'];
      user.firstName = 'admin';
      user.lastName = 'admin';
      user.admin = true;
      this.userService.registerUser(user)
        .then(response => {
          this.successMessage = 'An admin user is created successfully.';
          this.errorMessage = null;
          this.adminExists = true;
        })
        .catch((rejected: RejectedResponse) => {
          this.errorMessage = rejected.error;
          this.successMessage = null;
        });
    }
  }

  backToLogin() {
    this.router.navigate([ROUTES.login]);
  }
}
