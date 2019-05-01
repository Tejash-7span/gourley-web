import { Injectable } from '@angular/core';
import { UserSessionModel } from '../models/user-session.model';
import { JobType } from '../models/jobtype/job-type.model';

@Injectable()
export class LocalStorageService {
    private _tokenKey = 'auth_token';
    private _user = 'user';
    private _jobTypes = 'jobTypes';

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

    public get jobTypes(): JobType[] {
        return JSON.parse(localStorage.getItem(this._jobTypes));
    }

    public set jobTypes(jobTypes: JobType[]) {
        localStorage.setItem(this._jobTypes, JSON.stringify(jobTypes));
    }

    public logout(): void {
        localStorage.clear();
    }
}
