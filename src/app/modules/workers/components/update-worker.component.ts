import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { WorkerService } from '../../../general/services/worker.service';
import { RejectedResponse } from '../../../general/services/rest.service';
import { ROUTES } from '../../../general/models/constants';
import { WorkerModel } from '../../../general/models/workers/worker.model';
import { LocalStorageService } from '../../../general/services/localstorage.service';
import { JobType } from '../../../general/models/jobtype/job-type.model';

@Component({
    selector: 'app-update-worker',
    templateUrl: 'update-worker.component.html'
})
export class UpdateWorkerComponent implements OnInit, AfterViewInit {

    @ViewChild('firstControl')
    firstControl: ElementRef;

    errorMessage: string;
    workerForm: FormGroup;
    submitted = false;
    id = 0;
    jobType: JobType;
    existing: WorkerModel;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private workerService: WorkerService,
        private localStorageService: LocalStorageService,
        private formBuilder: FormBuilder) {
    }

    get form() {
        return this.workerForm.controls;
    }

    ngOnInit(): void {
        this.workerForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(45)]],
        });


        this.route.params.subscribe(data => {
            if (data['type']) {
                const jobTypeId = +data['type'];
                this.jobType = this.localStorageService.jobTypes.find(jobType => jobType.id === jobTypeId);
                if (this.jobType) {
                    if (data['id']) {
                        this.id = data['id'];
                        if (this.id > 0) {
                            this.loadWorker();
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

    ngAfterViewInit() {
        this.firstControl.nativeElement.focus();
    }

    saveWorker() {
        this.submitted = true;
        if (this.workerForm.valid) {
            this.workerService.updateWorker(WorkerModel.createInstance(this.id, this.jobType.id, this.workerForm))
                .then(response => {
                    this.backToList();
                })
                .catch((rejected: RejectedResponse) => {
                    this.errorMessage = rejected.error;
                });
        }
    }

    resetForm() {
        this.submitted = false;
        this.loadWorker();
    }

    backToList() {
        this.router.navigate([`${ROUTES.workers}/${this.jobType.id}`]);
    }

    private loadWorker() {
        if (this.existing) {
            this.workerForm.patchValue(this.existing);
        } else {
            this.workerService.get(this.jobType.id, this.id)
                .then((response: WorkerModel) => {
                    this.existing = response;
                    this.workerForm.patchValue(response);
                })
                .catch((rejected: RejectedResponse) => {
                    this.errorMessage = rejected.error;

                });
        }
    }
}

