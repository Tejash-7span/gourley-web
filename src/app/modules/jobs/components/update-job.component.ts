import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { JobService } from '../services/job.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ROUTES } from '../../../general/models/constants';
import { JobModel } from '../../../general/models/jobs/job.model';
import { JobPartListComponent } from './job-part-list.component';
import { JobType } from '../../../general/models/jobtype/job-type.model';
import { LocalStorageService } from '../../../general/services/localstorage.service';
import { JobExtraColumnsModel } from '../../../general/models/jobs/job-extra-columns.model';
import { WorkerModel } from '../../../general/models/workers/worker.model';
import { StatusModel } from '../../../general/models/status/status.model';
import { WorkerService } from '../../../general/services/worker.service';
import { StatusService } from '../../../general/services/status.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
    selector: 'app-update-job',
    templateUrl: 'update-job.component.html'
})
export class UpdateJobComponent implements OnInit {
    @ViewChild('firstControl')
    firstControl: ElementRef;

    @ViewChild('jobPartList')
    jobPartList: JobPartListComponent;

    errorMessage: string;
    job: JobModel;
    jobForm: FormGroup;
    submitted = false;
    id = 0;
    jobType: JobType;
    jobTypes: JobType[] = [];
    workers: WorkerModel[] = [];
    statusList: StatusModel[] = [];
    jobExtraColumns: JobExtraColumnsModel;
    loading = false;
    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
    };


    constructor(private router: Router,
        private route: ActivatedRoute,
        private jobService: JobService,
        private workerService: WorkerService,
        private statusService: StatusService,
        private localStorageService: LocalStorageService,
        private element: ElementRef,
        private formBuilder: FormBuilder) {
    }

    get form() {
        return this.jobForm.controls;
    }
    get isActive(): number {
        return this.jobForm.value['active'];
    }
    get isInvoiced(): number {
        return this.jobForm.value['invoiced'];
    }

    ngOnInit(): void {
        this.jobTypes = this.localStorageService.jobTypes.filter(type => type.jobEnabled);
        this.jobForm = this.formBuilder.group({
            customerName: ['', [Validators.required, Validators.maxLength(100)]],
            customerAddress: ['', [Validators.maxLength(100)]],
            customerPhone: ['', [Validators.maxLength(100)]],
            bidAcceptedDate: [''],
            jobActiveDate: [''],
            jobInvoiceDate: [''],
            column1StatusId: [''],
            column1WorkerId: [''],
            column2StatusId: [''],
            column2WorkerId: [''],
            column3StatusId: [''],
            column3WorkerId: [''],
            column4StatusId: [''],
            column4WorkerId: [''],
            active: [''],
            invoiced: [''],
            readyToBill: [''],
            notes: ['', [Validators.maxLength(1000)]],
        });

        this.route.params.subscribe(data => {
            if (data['type']) {
                const jobTypeId = +data['type'];
                this.jobType = this.localStorageService.jobTypes.find(jobType => jobType.id === jobTypeId);
                if (this.jobType) {
                    if (data['id']) {
                        this.id = data['id'];
                        if (this.id > 0) {
                            this.loadJob();
                            this.jobExtraColumns = JobExtraColumnsModel.createInstance(this.jobType.id);
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

    saveJob() {
        this.submitted = true;
        if (this.jobForm.valid) {
            this.jobService.updateJob(JobModel.createInstance(this.id, this.jobType.id, this.jobForm, this.jobPartList.getValues()))
                .then(response => {
                    this.backToList();
                })
                .catch((rejected: RejectedResponse) => {
                    this.errorMessage = rejected.error;
                });
        } else {
            this.focusFirstError();
        }
    }

    resetForm() {
        this.submitted = false;
        this.loadJob();
    }

    loadJob() {
        if (this.job) {
            this.patchForm();
        } else {
            this.loading = true;
            this.jobService.get(this.jobType.id, this.id).then(response => {
                this.workerService.getAll(this.jobType.id).then(workers => {
                    this.statusService.getAll().then(statusList => {
                        this.job = response;
                        this.workers = workers;
                        this.statusList = statusList;
                        this.patchForm();
                        this.loading = false;
                        this.firstControl.nativeElement.focus();
                    }).catch((statusRejected: RejectedResponse) => {
                        this.errorMessage = statusRejected.error;
                        this.loading = false;
                    });
                }).catch((workersRejected: RejectedResponse) => {
                    this.errorMessage = workersRejected.error;
                    this.loading = false;
                });

            }).catch((rejected: RejectedResponse) => {
                this.errorMessage = rejected.error;
                this.loading = false;
            });
        }
    }

    patchForm() {
        this.jobForm.patchValue({
            customerName: this.job.customerName,
            customerAddress: this.job.customerAddress,
            customerPhone: this.job.customerPhone,
            active: this.job.active,
            invoiced: this.job.invoiced,
            readyToBill: this.job.readyToBill,
            column1StatusId: this.getPatchValue(this.jobExtraColumns.column1.statusId),
            column1WorkerId: this.getPatchValue(this.jobExtraColumns.column1.workerId),
            column2StatusId: this.getPatchValue(this.jobExtraColumns.column2.statusId),
            column2WorkerId: this.getPatchValue(this.jobExtraColumns.column2.workerId),
            column3StatusId: this.getPatchValue(this.jobExtraColumns.column3.statusId),
            column3WorkerId: this.getPatchValue(this.jobExtraColumns.column3.workerId),
            column4StatusId: this.getPatchValue(this.jobExtraColumns.column4.statusId),
            column4WorkerId: this.getPatchValue(this.jobExtraColumns.column4.workerId),
            bidAcceptedDate: this.getDatePatchValue(new Date(this.job.bidAcceptedDate), true),
            jobActiveDate: this.getDatePatchValue(new Date(this.job.jobActiveDate)),
            jobInvoiceDate: this.getDatePatchValue(new Date(this.job.jobInvoiceDate)),
            notes: this.job.notes,
        });
    }

    getPatchValue(property: string) {
        const value = this.job[property];
        return value == null ? '' : value;
    }

    getDatePatchValue(date?: Date, defaultToday: boolean = false) {
        const newDate = new Date();
        if (date) {
            return {
                date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
            };
        } else if (defaultToday) {
            return {
                date: {
                    year: newDate.getFullYear(),
                    month: newDate.getMonth() + 1,
                    day: newDate.getDate()
                }
            };
        } else {
            return '';
        }
    }

    backToList() {
        this.router.navigate([`${ROUTES.jobs}/${this.jobType.id}`]);
    }

    focusFirstError() {
        const invalidControls = this.element.nativeElement.querySelectorAll('.is-invalid');
        (<HTMLInputElement>invalidControls[0]).focus();
    }
}

