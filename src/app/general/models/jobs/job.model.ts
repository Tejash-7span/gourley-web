import { FormGroup } from '@angular/forms';
import { JobPartModel } from '../parts/job-part.model';
import { JobType } from '../jobtype/job-type.model';
import { JobTypeEnum } from '../../enums/worktype.enum';

export class JobModel {
    id = 0;
    jobTypeId = 0;
    contactName: string = null;
    name: string = null;
    customerAddress: string = null;
    customerPhone: string = null;
    dateStarted: Date = null;
    dateFinished: Date = null;
    bidAcceptedDate: Date = null;
    jobActiveDate: Date = null;
    jobInvoiceDate: Date = null;
    active = false;
    invoiced = false;
    readyToBill = false;
    notes: string = null;
    hangWorkerId: number = null;
    hangStatusId: number = null;
    finishWorkerId: number = null;
    finishStatusId: number = null;
    sprayWorkerId: number = null;
    sprayStatusId: number = null;
    stockWorkerId: number = null;
    stockStatusId: number = null;
    measureWorkerId: number = null;
    measureStatusId: number = null;
    orderWorkerId: number = null;
    orderStatusId: number = null;
    setWorkerId: number = null;
    setStatusId: number = null;
    takeOffWorkerId: number = null;
    takeOffStatusId: number = null;
    latheWorkerId: number = null;
    latheStatusId: number = null;
    setupWorkerId: number = null;
    setupStatusId: number = null;
    crewWorkerId: number = null;
    crewStatusId: number = null;
    inspectionWorkerId: number = null;
    inspectionStatusId: number = null;
    jobType: JobType = null;
    jobParts: JobPartModel[] = null;

    public static createBidInstance(form: FormGroup, jobParts: JobPartModel[]) {
        const job = new JobModel();
        job.contactName = form.value['contactName'];
        job.name = form.value['name'];
        job.customerAddress = form.value['customerAddress'];
        job.customerPhone = form.value['customerPhone'];
        job.jobTypeId = form.value['jobTypeId'];
        job.notes = form.value['notes'];
        job.jobParts = jobParts;
        return job;
    }
    public static createInstance(id: number, jobTypeId: number, form: FormGroup, jobParts: JobPartModel[]) {
        const job = new JobModel();
        job.id = id;
        job.jobTypeId = jobTypeId;
        job.contactName = form.value['contactName'];
        job.name = form.value['name'];
        job.customerAddress = form.value['customerAddress'];
        job.customerPhone = form.value['customerPhone'];
        job.jobTypeId = form.value['jobTypeId'];
        job.active = form.value['active'];
        job.invoiced = form.value['invoiced'];
        job.readyToBill = form.value['readyToBill'];
        job.bidAcceptedDate = form.value['bidAcceptedDate'] ? new Date(form.value['bidAcceptedDate']['jsdate']) : null;
        job.jobActiveDate = form.value['jobActiveDate'] ? new Date(form.value['jobActiveDate']['jsdate']) : null;
        job.jobInvoiceDate = form.value['jobInvoiceDate'] ? new Date(form.value['jobInvoiceDate']['jsdate']) : null;
        job.notes = form.value['notes'];
        job.jobParts = jobParts;

        switch (JobTypeEnum[JobTypeEnum[jobTypeId]]) {
            case JobTypeEnum.DryWall:
                job.stockStatusId = form.value['column1StatusId'];
                job.stockWorkerId = form.value['column1WorkerId'];
                job.hangStatusId = form.value['column2StatusId'];
                job.hangWorkerId = form.value['column2WorkerId'];
                job.finishStatusId = form.value['column3StatusId'];
                job.finishWorkerId = form.value['column3WorkerId'];
                job.sprayStatusId = form.value['column4StatusId'];
                job.sprayWorkerId = form.value['column4WorkerId'];
                job.inspectionStatusId = form.value['column5StatusId'];
                job.inspectionWorkerId = form.value['column5WorkerId'];
                break;
            case JobTypeEnum.Stone:
                job.stockStatusId = form.value['column1StatusId'];
                job.stockWorkerId = form.value['column1WorkerId'];
                job.measureStatusId = form.value['column2StatusId'];
                job.measureWorkerId = form.value['column2WorkerId'];
                job.orderStatusId = form.value['column3StatusId'];
                job.orderWorkerId = form.value['column3WorkerId'];
                job.setStatusId = form.value['column4StatusId'];
                job.setWorkerId = form.value['column4WorkerId'];
                job.inspectionStatusId = form.value['column5StatusId'];
                job.inspectionWorkerId = form.value['column5WorkerId'];
                break;
            case JobTypeEnum.Stucco:
                job.takeOffStatusId = form.value['column1StatusId'];
                job.takeOffWorkerId = form.value['column1WorkerId'];
                job.latheStatusId = form.value['column2StatusId'];
                job.latheWorkerId = form.value['column2WorkerId'];
                job.setupStatusId = form.value['column3StatusId'];
                job.setupWorkerId = form.value['column3WorkerId'];
                job.crewStatusId = form.value['column4StatusId'];
                job.crewWorkerId = form.value['column4WorkerId'];
                job.inspectionStatusId = form.value['column5StatusId'];
                job.inspectionWorkerId = form.value['column5WorkerId'];
                break;
            case JobTypeEnum.MetalFraming:
                job.takeOffStatusId = form.value['column1StatusId'];
                job.takeOffWorkerId = form.value['column1WorkerId'];
                job.stockStatusId = form.value['column2StatusId'];
                job.stockWorkerId = form.value['column2WorkerId'];
                job.orderStatusId = form.value['column3StatusId'];
                job.orderWorkerId = form.value['column3WorkerId'];
                job.setStatusId = form.value['column4StatusId'];
                job.setWorkerId = form.value['column4WorkerId'];
                job.inspectionStatusId = form.value['column5StatusId'];
                job.inspectionWorkerId = form.value['column5WorkerId'];
                break;
        }
        return job;
    }

    public static get Empty(): JobModel {
        const job = new JobModel();
        job.jobParts = [];
        return job;
    }
}
