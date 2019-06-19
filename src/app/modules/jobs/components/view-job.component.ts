import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobService } from '../services/job.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ROUTES, QUANTITY_FORMAT, PRICE_FORMAT } from '../../../general/models/constants';
import { JobModel } from '../../../general/models/jobs/job.model';
import { JobType } from '../../../general/models/jobtype/job-type.model';
import { LocalStorageService } from '../../../general/services/localstorage.service';
import { ToastService } from '../../../general/services/toast.service';
import { WorkerService } from '../../../general/services/worker.service';
import { StatusService } from '../../../general/services/status.service';
import { WorkerModel } from '../../../general/models/workers/worker.model';
import { StatusModel } from '../../../general/models/status/status.model';
import { JobExtraColumnsModel, Column } from '../../../general/models/jobs/job-extra-columns.model';

@Component({
    selector: 'app-view-job',
    templateUrl: 'view-job.component.html'
})
export class ViewJobComponent implements OnInit {

    job: JobModel;
    jobType: JobType;
    id = 0;
    workers: WorkerModel[] = [];
    statusList: StatusModel[] = [];
    jobExtraColumns: JobExtraColumnsModel;
    jobFilterOption = null;
    quantityFormat = QUANTITY_FORMAT;
    priceFormat = PRICE_FORMAT;
    printDate = new Date();

    constructor(private router: Router,
        private route: ActivatedRoute,
        private jobService: JobService,
        private workerService: WorkerService,
        private statusService: StatusService,
        private toastService: ToastService,
        private localStorageService: LocalStorageService) {
    }

    get grandQuantity(): number {
        let value = 0;
        this.job.jobParts.forEach(item => value = value + item.quantity);
        return value;
    }
    get grandTotalPrice(): number {
        let value = 0;
        this.job.jobParts.forEach(item => value = value + (item.quantity * item.part.averagePrice));
        return value;
    }
    get grandTotalCrewCost(): number {
        let value = 0;
        this.job.jobParts.forEach(item => value = value + (item.quantity * item.part.crewCost));
        return value;
    }
    get grandTotalCost(): number {
        let value = 0;
        this.job.jobParts.forEach(item => value = value + ((item.quantity * item.part.averagePrice) + (item.quantity * item.part.crewCost)));
        return value;
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(data => {
            if (data['status'] && !isNaN(data['status'])) {
                const status = +data['status'];
                this.jobFilterOption = status >= 1 && status <= 4 ? status.toString() : '1';
            }
        });
        this.route.params.subscribe(data => {
            if (data['type']) {
                const jobTypeId = +data['type'];
                this.jobType = this.localStorageService.jobTypes.find(jobType => jobType.id === jobTypeId);
                if (this.jobType) {
                    if (data['id']) {
                        this.id = data['id'];
                        if (this.id > 0) {
                            this.jobExtraColumns = JobExtraColumnsModel.createInstance(this.jobType.id);
                            this.loadJob();
                        } else {
                            this.router.navigate([ROUTES.notfound]);
                        }
                    } else {
                        this.router.navigate([ROUTES.notfound]);
                    }
                } else {
                    this.router.navigate([ROUTES.notfound]);
                }
            } else {
                this.router.navigate([ROUTES.notfound]);
            }
        });
    }

    loadJob() {
        this.jobService.get(this.jobType.id, this.id).then(response => {
            this.workerService.getAll(this.jobType.id).then(workers => {
                this.statusService.getAll().then(statusList => {
                    this.job = response;
                    this.workers = workers;
                    this.statusList = statusList;
                }).catch((statusRejected: RejectedResponse) => {
                    this.toastService.error(statusRejected.error);
                });
            }).catch((workersRejected: RejectedResponse) => {
                this.toastService.error(workersRejected.error);
            });
        }).catch((rejected: RejectedResponse) => {
            this.toastService.error(rejected.error);
        });
    }

    backToList() {
        if (this.jobFilterOption) {
            this.router.navigate([`${ROUTES.jobs}/${this.jobType.id}`], { queryParams: { status: this.jobFilterOption } });
        } else {
            this.router.navigate([`${ROUTES.jobs}/${this.jobType.id}`]);
        }
    }

    getStatusName(column: Column) {
        const statusId = this.job[column.statusId];
        const status = this.statusList.find(item => item.id === statusId);
        return status ? status.name : '-';
    }

    getWorkerName(column: Column) {
        const workerId = this.job[column.workerId];
        const worker = this.workers.find(item => item.id === workerId);
        return worker ? worker.name : '-';
    }

    redirectToUpdate() {
        if (this.jobFilterOption) {
            this.router.navigate([`${ROUTES.jobs}/${this.jobType.id}/update/${this.id}`], { queryParams: { status: this.jobFilterOption } });
        } else {
            this.router.navigate([`${ROUTES.jobs}/${this.jobType.id}/update/${this.id}`]);
        }
    }
}
