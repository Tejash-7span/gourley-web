import { Injectable } from '@angular/core';
import { RestService } from '../../../general/services/rest.service';
import { PagedData } from '../../../general/models/paged-data.model';
import { UserModel } from '../../../general/models/users/user.model';

@Injectable()
export class UserService {

    constructor(private restService: RestService) {

    }

    public getList(page: number, searchTerm: string = ''): Promise<PagedData<UserModel>> {
        return this.restService.getPagedData('users', page, searchTerm);
    }

    public get(id: number): Promise<UserModel> {
        const path = `users/${id}`;
        return this.restService.get(path);
    }

    public getAdmin(): Promise<UserModel> {
        const path = `users/admin`;
        return this.restService.get(path);
    }

    public registerUser(user: UserModel): Promise<void> {
        return this.restService.post('register', user);
    }

    public createUser(user: UserModel): Promise<void> {
        return this.restService.post('users', user);
    }

    public updateUser(user: UserModel): Promise<void> {
        return this.restService.put(`users/${user.id}`, user);
    }

    public deleteUser(id: number): Promise<void> {
        return this.restService.delete(`users/${id}`);
    }

    public uploadImage(id: number, formData: FormData) {
        return this.restService.upload(`users/${id}/upload`, formData);
    }

    public clearImage(id: number): Promise<void> {
        return this.restService.delete(`users/${id}/image`);
    }
}
