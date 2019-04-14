export class PagedData<T> {
    data: T[];
    page: number;
    totalRecords: number;

    constructor(data: T[], page: number, totalRecords: number) {
        this.data = data;
        this.page = page;
        this.totalRecords = totalRecords;
    }
}
