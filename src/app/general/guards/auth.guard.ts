import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ROUTES } from '../models/constants';
import { LocalStorageService } from '../services/localstorage.service';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authenticationService: AuthenticationService,
        private localStorageService: LocalStorageService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authenticationService.isLoggedIn || this.isTokenExpired()) {
            this.authenticationService.logout();
            this.router.navigate([ROUTES.login]);
        } else {
            return true;
        }
    }

    private getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);

        if (decoded.exp === undefined) { return null; }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    private isTokenExpired(): boolean {
        const token = this.localStorageService.token;
        const date = this.getTokenExpirationDate(token);
        if (date === undefined) { return false; }
        return !(date.valueOf() > new Date().valueOf());
    }
}
