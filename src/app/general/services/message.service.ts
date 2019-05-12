import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
    private logoutSubject = new Subject<void>();
    private imageUploadSubject = new Subject<void>();

    public sendLogoutMessage(): void {
        this.logoutSubject.next();
    }

    public sendImageUploadedMessage(): void {
        this.imageUploadSubject.next();
    }

    public get onLogout(): Observable<void> {
        return this.logoutSubject.asObservable();
    }

    public get onImageUploaded(): Observable<void> {
        return this.imageUploadSubject.asObservable();
    }
}
