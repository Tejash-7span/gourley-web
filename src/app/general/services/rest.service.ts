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

    public getPagedData<T>(path: string, page: number, searchTerm: string = '', queryParams: { [key: string]: string } = null): Promise<PagedData<T>> {
        let url = `${this.apiURL}/${path}?page=${page}&perpage=${PER_PAGE}&searchterm=${searchTerm}`;
        const queryString = this.getQueryParams(queryParams);
        if (queryString) {
            url = url + queryString;
        }
        return new Promise<PagedData<T>>((resolve, reject) => {
            this.httpClient.get<T[]>(url, { headers: this.requestHeaders, observe: 'response' })
                .toPromise().then(response => {
                    let totalRecords = 0;
                    if (response.headers.has('TotalRecords')) {
                        totalRecords = +response.headers.get('TotalRecords');
                    }
                    resolve(new PagedData<T>(response.body, page, totalRecords));
                }).catch(rejected => {
                    const rejectedResponse = this.handleRejected(rejected);
                    if (rejectedResponse) {
                        reject(rejectedResponse);
                    }
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
                    const rejectedResponse = this.handleRejected(rejected);
                    if (rejectedResponse) {
                        reject(rejectedResponse);
                    }
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
                    const rejectedResponse = this.handleRejected(rejected);
                    if (rejectedResponse) {
                        reject(rejectedResponse);
                    }
                });
        });
    }

    public put<T>(path: string, data: any): Promise<T> {
        const url = `${this.apiURL}/${path}`;
        return new Promise<T>((resolve, reject) => {
            this.httpClient.put<T>(url, data, { headers: this.requestHeaders })
                .toPromise().then(response => {
                    resolve(response);
                }).catch(rejected => {
                    const rejectedResponse = this.handleRejected(rejected);
                    if (rejectedResponse) {
                        reject(rejectedResponse);
                    }
                });
        });
    }

    public delete<T>(path: string): Promise<T> {
        const url = `${this.apiURL}/${path}`;
        return new Promise<T>((resolve, reject) => {
            this.httpClient.delete<T>(url, { headers: this.requestHeaders })
                .toPromise().then(response => {
                    resolve(response);
                }).catch(rejected => {
                    const rejectedResponse = this.handleRejected(rejected);
                    if (rejectedResponse) {
                        reject(rejectedResponse);
                    }
                });
        });
    }

    private handleRejected(rejected: any): RejectedResponse {
        if (rejected.status && rejected.status === 401) {
            this.messageService.sendLogoutMessage();
            return null;
        } else {
            return new RejectedResponse(rejected);
        }
    }

    private getQueryParams(queryParams: { [key: string]: string } = null): string {
        if (queryParams) {
            let queryString = '';
            const keys = Object.keys(queryParams);
            for (const key of keys) {
                queryString += `&${key}=${queryParams[key]}`;
            }
            return queryString;
        }
        return '';
    }
}

export class RejectedResponse {
    rejected: any;
    error: string;
    status = 0;

    constructor(rejected: any) {
        console.log(rejected);
        this.rejected = rejected;
        if (this.rejected && this.rejected.error) {
            if (this.rejected.error.message) {
                this.error = this.rejected.error.message;
            } else if (this.rejected.error.Error) {
                this.error = this.rejected.error.Error;
            } else {
                this.error = 'Something went wrong. Please contact your administrator.';
            }
            if (this.rejected.status) {
                this.status = this.rejected.status;
            }
        } else {
            this.error = 'Something went wrong. Please contact your administrator.';
        }
    }
}
