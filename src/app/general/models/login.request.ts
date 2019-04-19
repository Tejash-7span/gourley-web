import { FormGroup } from '@angular/forms';

export class LoginRequest {
    userName: string;
    password: string;

    constructor(userName: string, password: string) {
        this.userName = userName;
        this.password = password;
    }

    public static createInstance(form: FormGroup) {
        const userName = form.value['userName'] ? form.value['userName'] : null;
        const password = form.value['password'] ? form.value['password'] : null;
        return new LoginRequest(userName, password);
    }
}
