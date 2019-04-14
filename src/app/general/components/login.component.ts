import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { LoginRequest } from '../models/login.request';
import { RejectedResponse } from '../services/rest.service';
import { LoginResponse } from '../models/login.response';
import { LocalStorageService } from '../services/localstorage.service';
import { UserSessionModel } from '../models/user-session.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;
  errorMessage: string;

  constructor(private auth: AuthenticationService, private localStorageService: LocalStorageService, private router: Router) {

  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  public login() {
    const request = new LoginRequest(this.userName, this.password);
    this.auth.login(request)
      .then((response: LoginResponse) => {
        this.setUser(response);
        this.errorMessage = null;
        this.router.navigate(['/dashboard']);
      })
      .catch((reject: RejectedResponse) => {
        this.errorMessage = reject.error;
      });
  }

  private setUser(user: LoginResponse) {
    this.localStorageService.loggedInUser = new UserSessionModel(user.id, user.firstName, user.lastName, user.userName);
    this.localStorageService.token = user.token;
  }
}

