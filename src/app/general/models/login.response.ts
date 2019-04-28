import { UserModel } from './users/user.model';

export class LoginResponse {
    user: UserModel;
    token: string;
}
