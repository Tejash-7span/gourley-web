export class JobFilterModel {
    page: number;
    searchTerm = '';
    active?: boolean;
    invoiced?: boolean;
    readyToBill?: boolean;
    customerName: string;
    startDate?: Date;
    endDate?: Date;
}
