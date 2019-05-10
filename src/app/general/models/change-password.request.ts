import { FormGroup } from '@angular/forms';

export class ChangePasswordRequest {
    userName: string;
    oldPassword: string;
    newPassword: string;

    public static createIntance(userName: string, form: FormGroup): ChangePasswordRequest {
        const request = new ChangePasswordRequest();
        request.userName = userName;
        request.oldPassword = form.value['oldPassword'];
        request.newPassword = form.value['newPassword'];
        return request;
    }
}
