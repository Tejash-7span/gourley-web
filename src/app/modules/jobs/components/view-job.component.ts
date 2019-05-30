import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobService } from '../services/job.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ROUTES } from '../../../general/models/constants';
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

    constructor(private router: Router,
        private route: ActivatedRoute,
        private jobService: JobService,
        private workerService: WorkerService,
        private statusService: StatusService,
        private toastService: ToastService,
        private localStorageService: LocalStorageService) {
    }

    ngOnInit(): void {
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
        this.router.navigate([`${ROUTES.jobs}/${this.jobType.id}`]);
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
        this.router.navigate([`${ROUTES.jobs}/${this.jobType.id}/update/${this.id}`]);
    }
}
