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
import { IMyDpOptions, MyDatePicker } from 'mydatepicker';
import { ToastService } from '../../../general/services/toast.service';
import { conditionalRequried } from '../../../general/helpers/conditional-required.validator';

@Component({
    selector: 'app-update-job',
    templateUrl: 'update-job.component.html'
})
export class UpdateJobComponent implements OnInit {
    @ViewChild('firstControl')
    firstControl: ElementRef;

    @ViewChild('jobPartList')
    jobPartList: JobPartListComponent;

    @ViewChild('bidAcceptedDateControl') bidAcceptedDateControl: MyDatePicker;
    @ViewChild('jobActiveDateControl') jobActiveDateControl: MyDatePicker;

    job: JobModel;
    jobForm: FormGroup;
    submitted = false;
    id = 0;
    jobType: JobType;
    jobTypes: JobType[] = [];
    workers: WorkerModel[] = [];
    statusList: StatusModel[] = [];
    jobExtraColumns: JobExtraColumnsModel;
    returnUrl: string;
    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'mm/dd/yyyy',
    };


    constructor(private router: Router,
        private route: ActivatedRoute,
        private jobService: JobService,
        private workerService: WorkerService,
        private statusService: StatusService,
        private toastService: ToastService,
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
            customerPhone: ['', [Validators.maxLength(14)]],
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
        }, {
                validators: [conditionalRequried('bidAcceptedDate', 'active'), conditionalRequried('jobActiveDate', 'active')]
            });

        this.route.queryParams.subscribe(params => {
            if (params['returnUrl']) {
                this.returnUrl = params['returnUrl'];
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

    saveJob() {
        this.submitted = true;
        if (this.jobForm.valid) {
            this.jobService.updateJob(JobModel.createInstance(this.id, this.jobType.id, this.jobForm, this.jobPartList.getValues()))
                .then(response => {
                    this.backToList();
                    this.toastService.success('Job is updated successfully');
                })
                .catch((rejected: RejectedResponse) => {
                    this.toastService.error(rejected.error);
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
            this.jobService.get(this.jobType.id, this.id).then(response => {
                this.workerService.getAll(this.jobType.id).then(workers => {
                    this.statusService.getAll().then(statusList => {
                        this.job = response;
                        this.workers = workers;
                        this.statusList = statusList;
                        this.patchForm();
                        setTimeout(() => {
                            this.firstControl.nativeElement.focus();
                        }, 500);
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
            bidAcceptedDate: this.getDatePatchValue(this.job.bidAcceptedDate, true),
            jobActiveDate: this.getDatePatchValue(this.job.jobActiveDate),
            jobInvoiceDate: this.getDatePatchValue(this.job.jobInvoiceDate),
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
            date = new Date(date);
            return {
                date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                },
                jsdate: date
            };
        } else if (defaultToday) {
            return {
                date: {
                    year: newDate.getFullYear(),
                    month: newDate.getMonth() + 1,
                    day: newDate.getDate()
                },
                jsdate: newDate
            };
        } else {
            return '';
        }
    }

    backToList() {
        if (this.returnUrl) {
            this.router.navigate([`${this.returnUrl}/${this.jobType.id}`]);
        } else {
            this.router.navigate([`${ROUTES.jobs}/${this.jobType.id}`]);
        }

    }

    focusFirstError() {
        const invalidControls = this.element.nativeElement.querySelectorAll('.is-invalid');
        if (invalidControls && invalidControls.length > 0) {
            const invalidControl = invalidControls[0];
            const nameAttr = invalidControl.getAttribute('name');
            if (nameAttr && nameAttr === 'bidAcceptedDate') {
                this.bidAcceptedDateControl.setFocusToInputBox();
            } else if (nameAttr && nameAttr === 'jobActiveDate') {
                this.jobActiveDateControl.setFocusToInputBox();
            } else {
                (<HTMLInputElement>invalidControl).focus();
            }
        }
    }
}

