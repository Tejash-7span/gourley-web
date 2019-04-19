import { Injectable } from '@angular/core';
import { RestService } from '../../../general/services/rest.service';
import { UserModel } from '../models/user.model';
import { PagedData } from '../../../general/models/paged-data.model';

@Injectable()
export class UserService {

    constructor(private restService: RestService) {

    }

    public getList(page: number): Promise<PagedData<UserModel>> {
        return this.restService.getPagedData('users', page);
    }

    public get(id: number): Promise<UserModel> {
        const path = `users/${id}`;
        return this.restService.get(path);
    }

    public createUser(user: UserModel): Promise<void> {
        return this.restService.post('users', user);
    }

    public updateUser(user: UserModel): Promise<void> {
        return this.restService.put(`users/${user.id}`, user);
    }
}
