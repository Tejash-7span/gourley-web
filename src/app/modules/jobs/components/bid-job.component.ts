import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { JobService } from '../services/job.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ROUTES } from '../../../general/models/constants';
import { GetWorkTypeName, isTypeValid } from '../../../general/helpers/enum.helper';
import { WorkType } from '../../../general/enums/worktype.enum';
import { JobModel } from '../../../general/models/jobs/job.model';
import { JobType } from '../../../general/models/jobtype/job-type.model';
import { LocalStorageService } from '../../../general/services/localstorage.service';

@Component({
    selector: 'app-bid-job',
    templateUrl: 'bid-job.component.html'
})
export class BidJobComponent implements OnInit, AfterViewInit {
    @ViewChild('firstControl')
    firstControl: ElementRef;

    errorMessage: string;
    jobForm: FormGroup;
    submitted = false;
    jobTypes: JobType[] = [];

    constructor(private router: Router,
        private jobService: JobService,
        private localStorageService: LocalStorageService,
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
            customerPhone: ['', [Validators.maxLength(100)]],
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
            // this.jobService.createJob(JobModel.createInstance(0, this.jobForm))
            //     .then(response => {
            //         this.backToList();
            //     })
            //     .catch((rejected: RejectedResponse) => {
            //         this.errorMessage = rejected.error;
            //     });
        }
    }

    resetForm() {
        this.submitted = false;
        this.jobForm.patchValue(new JobModel());
    }

    backToList() {
        this.router.navigate([ROUTES.jobs]);
    }
}

