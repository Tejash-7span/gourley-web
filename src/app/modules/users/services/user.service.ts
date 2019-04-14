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
}
