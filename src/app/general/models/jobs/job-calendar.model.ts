export class JobCalendar {
    id = 0;
    jobTypeId = 0;
    contactName: string = null;
    name: string = null;
    dateStarted: Date;
    readyToBill = false;
    invoiced = false;
    jobInvoiceDate: Date;
}
