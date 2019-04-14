import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './localstorage.service';
import { PagedData } from '../models/paged-data.model';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { PER_PAGE } from '../models/constants';

@Injectable()
export class RestService {
    private apiURL = 'http://localhost:5000';

    constructor(private httpClient: HttpClient,
        private localStorageService: LocalStorageService,
        private messageService: MessageService) {

    }

    private get requestHeaders(): any {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (this.localStorageService.token) {
            headers['Authorization'] = `bearer ${this.localStorageService.token}`;
        }
        return headers;
    }

    public getPagedData<T>(path: string, page: number): Promise<PagedData<T>> {
        const url = `${this.apiURL}/${path}?page=${page}&perpage=${PER_PAGE}`;
        return new Promise<PagedData<T>>((resolve, reject) => {
            this.httpClient.get<T[]>(url, { headers: this.requestHeaders, observe: 'response' })
                .toPromise().then(response => {
                    let totalRecords = 0;
                    if (response.headers.has('TotalRecords')) {
                        totalRecords = +response.headers.get('TotalRecords');
                    }
                    resolve(new PagedData<T>(response.body, page, totalRecords));
                }).catch(rejected => {
                    reject(this.handleRejected(rejected));
                });
        });
    }

    public get<T>(path: string): Promise<T> {
        const url = `${this.apiURL}/${path}`;
        return new Promise<T>((resolve, reject) => {
            this.httpClient.get<T>(url, { headers: this.requestHeaders })
                .toPromise().then(response => {
                    resolve(response);
                }).catch(rejected => {
                    reject(this.handleRejected(rejected));
                });
        });
    }

    public post<T>(path: string, data: any): Promise<T> {
        const url = `${this.apiURL}/${path}`;
        return new Promise<T>((resolve, reject) => {
            this.httpClient.post<T>(url, data, { headers: this.requestHeaders })
                .toPromise().then(response => {
                    resolve(response);
                }).catch(rejected => {
                    reject(this.handleRejected(rejected));
                });
        });
    }

    private handleRejected(rejected: any): RejectedResponse {
        if (rejected.status && rejected.status === 401) {
            this.messageService.sendLogoutMessage();
        }

        return new RejectedResponse(rejected);
    }
}

export class RejectedResponse {
    rejected: any;
    error: string;

    constructor(rejected: any) {

        this.rejected = rejected;
        if (this.rejected && this.rejected.error && this.rejected.error.message) {
            this.error = this.rejected.error.message;
        }
    }
}
