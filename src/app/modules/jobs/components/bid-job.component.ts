import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { JobService } from '../services/job.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ROUTES } from '../../../general/models/constants';
import { JobModel } from '../../../general/models/jobs/job.model';
import { JobType } from '../../../general/models/jobtype/job-type.model';
import { LocalStorageService } from '../../../general/services/localstorage.service';
import { JobPartListComponent } from './job-part-list.component';
import { ToastService } from '../../../general/services/toast.service';

@Component({
    selector: 'app-bid-job',
    templateUrl: 'bid-job.component.html'
})
export class BidJobComponent implements OnInit, AfterViewInit {
    @ViewChild('firstControl')
    firstControl: ElementRef;

    @ViewChild('jobPartList')
    jobPartList: JobPartListComponent;

    jobForm: FormGroup;
    submitted = false;
    selectedJobTypeId = 0;
    jobTypes: JobType[] = [];

    constructor(private router: Router,
        private jobService: JobService,
        private toastService: ToastService,
        private localStorageService: LocalStorageService,
        private element: ElementRef,
        private formBuilder: FormBuilder) {
    }

    get form() {
        return this.jobForm.controls;
    }

    ngOnInit(): void {
        this.jobTypes = this.localStorageService.jobTypes.filter(type => type.jobEnabled);
        this.jobForm = this.formBuilder.group({
            customerName: ['', [Validators.required, Validators.maxLength(100)]],
            customerAddress: ['', [Validators.maxLength(100)]],
            customerPhone: ['', [Validators.maxLength(14)]],
            notes: ['', [Validators.maxLength(1000)]],
            jobTypeId: ['', [Validators.required]]
        });

        this.resetForm();
    }

    ngAfterViewInit(): void {
        this.firstControl.nativeElement.focus();
    }

    saveJob() {
        this.submitted = true;
        if (this.jobForm.valid) {
            const job = JobModel.createBidInstance(this.jobForm, this.jobPartList.getValues());
            this.selectedJobTypeId = job.jobTypeId;
            this.jobService.createJob(job)
                .then(response => {
                    this.backToList();
                    this.toastService.success('New bid is created successfully');
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
        this.jobForm.patchValue({
            customerName: '',
            customerAddress: '',
            customerPhone: '',
            notes: '',
            jobTypeId: '',
        });
    }

    backToList() {
        this.router.navigate([`${ROUTES.jobs}/editjob/${this.selectedJobTypeId}`]);
    }

    focusFirstError() {
        const invalidControls = this.element.nativeElement.querySelectorAll('.is-invalid');
        (<HTMLInputElement>invalidControls[0]).focus();
    }
}
