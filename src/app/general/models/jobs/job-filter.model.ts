export class JobFilterModel {
    page: number;
    searchTerm = '';
    active?: boolean;
    invoiced?: boolean;
    readyToBill?: boolean;
    name: string;
    startDate?: Date;
    endDate?: Date;
}
