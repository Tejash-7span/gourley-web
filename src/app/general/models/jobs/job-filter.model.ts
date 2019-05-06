export class JobFilterModel {
    page: number;
    searchTerm = '';
    active?: boolean;
    invoiced?: boolean;
    readyToBill?: boolean;
}
