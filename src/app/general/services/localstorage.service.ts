import { Injectable } from '@angular/core';
import { UserSessionModel } from '../models/user-session.model';

@Injectable()
export class LocalStorageService {
    private _tokenKey = 'auth_token';
    private _user = 'user';

    public get token(): string {
        return localStorage.getItem(this._tokenKey);
    }

    public set token(token: string) {
        localStorage.setItem(this._tokenKey, token);
    }

    public get loggedInUser(): UserSessionModel {
        return JSON.parse(localStorage.getItem(this._user));
    }

    public set loggedInUser(user: UserSessionModel) {
        localStorage.setItem(this._user, JSON.stringify(user));
    }

    public logout(): void {
        localStorage.clear();
    }
}
