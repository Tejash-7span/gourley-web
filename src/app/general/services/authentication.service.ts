import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { LoginRequest } from '../models/login.request';
import { LoginResponse } from '../models/login.response';
import { LocalStorageService } from './localstorage.service';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { ROUTES } from '../models/constants';
import { ChangePasswordRequest } from '../models/change-password.request';
import { Subscription } from 'rxjs';


@Injectable()
export class AuthenticationService {
    constructor(private restService: RestService,
        private localStorageService: LocalStorageService,
        private router: Router,
        private messageService: MessageService) {
        messageService.onLogout.subscribe(handler => {
            this.logout();
        });
    }

    public get isLoggedIn(): boolean {
        return !!this.localStorageService.loggedInUser;
    }

    public login(loginRequest: LoginRequest): Promise<LoginResponse> {
        return this.restService.post<LoginResponse>('login', loginRequest);
    }

    public changePassword(changePasswordRequest: ChangePasswordRequest): Promise<void> {
        return this.restService.put<void>('login/changepassword', changePasswordRequest);
    }

    public logout() {
        this.localStorageService.logout();
        this.router.navigate([ROUTES.login]);
    }
}
