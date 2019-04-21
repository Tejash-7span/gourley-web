import { UserModel } from '../../modules/users/models/user.model';

export class LoginResponse {
    user: UserModel;
    token: string;
}
