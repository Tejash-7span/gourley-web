import { FormGroup } from '@angular/forms';

export class UserModel {
    id = 0;
    firstName = '';
    lastName = '';
    userName = '';
    email = '';
    admin = false;
    workType = '';
    password = '';
    imageUrl = '';

    public static createInstance(id: number, form: FormGroup) {
        const user = new UserModel();
        user.id = id;
        user.firstName = form.value['firstName'];
        user.lastName = form.value['lastName'];
        user.userName = form.value['userName'];
        user.email = form.value['email'];
        user.workType = form.value['workType'];
        user.password = form.value['password'];
        user.admin = form.value['admin'];
        return user;
    }
}
