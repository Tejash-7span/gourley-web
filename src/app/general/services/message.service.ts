import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
    private logoutSubject = new Subject<void>();

    public sendLogoutMessage(): void {
        this.logoutSubject.next();
    }

    public get onLogout(): Observable<void> {
        return this.logoutSubject.asObservable();
    }
}
